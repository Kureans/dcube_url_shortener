const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const generateId = require('generate-unique-id');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const urlMap = {};

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());

const db = new sqlite3.Database('urlshortener-db', (err) => {
  if (err) {
    console.log(err);
  }
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});

initTables();

app.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl;
  
  // can skip db query if inside in-memory map
  let originalUrl = urlMap[shortUrl];
  if (originalUrl) {
    res.redirect(originalUrl);
  }

  db.get(`SELECT original_url FROM urls WHERE short_url = ${shortUrl}`, async (err, row) => {
    originalUrl = row;
  })

  if (originalUrl) {
    res.redirect(originalUrl);
  }
  else {
    res.status(404).json({error: 'Short URL not found!'});
  }
});

app.post('/shorten', (req, res) => {
  const originalUrl = req.body.url;
  const userId = req.body.userId;
  const shortUrl = generateId({length: 8});
  console.log("shorten endpoint");
  console.log(`og url: ${originalUrl}, short url: ${shortUrl}, id ${userId}`);
  // in memory map for non-account users
  urlMap[shortUrl] = originalUrl;
  console.log(shortUrl);
  if (userId) {
      console.log(`storing in user id ${userId}'s database`);
      db.run(`INSERT INTO urls (original_url, short_url, user_id) VALUES ('${originalUrl}', '${shortUrl}', ${userId})`, function (err) {
      if (err) {
        console.log(err);
      }
      res.json({ shortUrl });
    });
  }
  else {
    res.json({ shortUrl });
  }
});

app.get('/urls/:id', (req, res) => {
  const userId = req.params.id;
  db.all(`SELECT short_url, original_url FROM urls
        WHERE user_id = ${userId}`, (err, rows) => {
          res.json(rows);
    });
});

app.post('/signup', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  if (password != confirmPassword) {
    res.json({"message": "passwords do not match"});
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const userid = createUser(username, hashedPassword);
  const token = createToken(userid);
  res.cookie('jwt', token, { httpOnly: false, maxAge: process.env.MAX_AGE * 1000 });
  res.status(201).json({ username, hashedPassword });
});

app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(`username: ${username}`);

  db.get(`SELECT * FROM users WHERE username = '${username}'`, async (err, row) => {
    if (!row) {
      res.json({ "message": "User does not exist" });
    }
    console.log(row);
    const hashedPassword = row.password;
    const auth = await bcrypt.compare(password, hashedPassword);

    if (!auth) {
      res.json({ "message": "Incorrect Password "});
    }
    else {
      const userid = row.id;
      const token = createToken(userid);
      res.cookie('jwt', token, { httpOnly: false, maxAge: process.env.MAX_AGE * 1000 });
      res.status(200).json({"message": "Successfully logged in" });
    }
  });
});

function initTables() {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY, 
    username TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS urls ( 
    id INTEGER PRIMARY KEY, 
    original_url TEXT NOT NULL, 
    short_url TEXT UNIQUE NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
    )`);
}

function createUser(username, hashedPassword) {
  db.run(`INSERT INTO users (username, password)
    VALUES ('${username}', '${hashedPassword}')
  `, function (err) {
    if (err) {
      console.log(err);
    }
    console.log(`LAST ID: ${this.lastID}`);
  });
  
  return -1;
}

function createToken(userid) {
  return jwt.sign({ userid }, process.env.SECRET_STRING, {
    expiresIn: process.env.MAX_AGE
  });
}