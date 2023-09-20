const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const generateId = require('generate-unique-id');

const app = express();
const db = new sqlite3.Database('urlshortener-db');
const port = 3000;
const urlMap = {};

initDB();

app.use(express.json());

app.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl;
  console.log(shortUrl);
  const originalUrl = urlMap[shortUrl];
  console.log(originalUrl);
  if (originalUrl) {
    res.redirect(originalUrl);
  }
  else {
    res.status(404).json({error: 'Short URL not found!'});
  }
});

app.post('/shorten', (req, res) => {
  const originalUrl = req.body.url;
  const shortUrl = generateId({length: 8});
  urlMap[shortUrl] = originalUrl;
  console.log(urlMap);
  res.json({ shortUrl, originalUrl });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function initDB() {
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