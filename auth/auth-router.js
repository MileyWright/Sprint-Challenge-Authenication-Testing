const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model');
const secrets = require('../config/secrets');
const router = require('express').Router();

function getToken(user){
    const payload ={
        subject:user.id,
        username: user.username,
        department: user.department
    };
    const secret = secrets.jwtSecret;
    const options = {
        expiresIn: '1d'
    };
    return jwt.sign(payload, secret, options);
};

// POST /api/auth/register
router.post('/register', (req,res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
    .then(added => {
        const token = getToken(added);
        res.status(201).json({created_user: added, token: token});
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

//POST /api/auth/login
router.post('/login', (req, res) => {
    let {username, password} = req.body;
    Users.findBy({username})
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = getToken(user)
            res.status(200).json({ message: `Welcome ${user.username} ! ${token}`})
        } else {
            res.status(401).json({message: 'Unauthorized'})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router;
