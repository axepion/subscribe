const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const db = require('../db');

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, ({expiresIn: "24h"}))
}

class AuthController {

    async registration(req, res) {

        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message: 'validate error', errors})
            }
            const { username, password } = req.body;
            const dateRegistration = new Date();
            const checkUser = await db.query('SELECT * FROM users WHERE username = $1', [username])
            if (!checkUser.rows[0]) {
                const hashPassword = bcrypt.hashSync(password, 7)
                await db.query('INSERT INTO users (username, password, date_registration) values ($1, $2, $3) RETURNING *', [username, hashPassword, dateRegistration])
                return res.status(200).json({message: "Registration success"})
                
            }
            res.send('username has already exist');

        } catch (err) {
            console.log(err)
            res.status(400).json({message: 'Registration error'})
        }

    }

    async login(req, res) {

        try {
            const { username, password } = req.body;
            const checkUser = await db.query('SELECT * FROM users where username = $1', [username])
            if(!checkUser.rows[0]){
                return res.json({message: "Incorrect username"})
            } 
            const comparePassword = bcrypt.compareSync(password, checkUser.rows[0].password)
            if(!comparePassword) {
                return res.json({message: "Incorrect password!"})
            } 
            const token = generateAccessToken(checkUser.rows[0].id);
            return res.json({ token })

            } catch (err) {
                console.log(err)
                res.status(400).json({message: 'Registration error'})
        }

    }

    async getUsers(req, res) {
        
    }
}

module.exports = new AuthController();