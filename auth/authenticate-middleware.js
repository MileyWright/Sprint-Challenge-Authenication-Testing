/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const secrets = require('../config/secrets');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const token = req.headers.authorization;
    console.log(token)
       if (token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedJwt) => {
            if(err) {
                res.status(401).json({message: 'shall not pass!'})
            } else {
                req.user = decodedJwt;
                next();
            }
        })
    } else {
        res.status(400).json({message: 'Nope try again'})
    }
};
