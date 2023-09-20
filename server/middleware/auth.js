const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.SECRET_STRING, async (err, decoded) => {
            if (err) {
                console.log(err);
                res.json({ "message": "Something went wrong with verification" });
            }
            console.log(decoded);
            next();
        })
    }
    res.json({ "message": "Unauthorized" });
}