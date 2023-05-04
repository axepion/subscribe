const db = require('../db');
const bcrypt = require('bcrypt');


class AuthController {
    async registration(req, res) {
        try{
            const { username, password } = req.body;
            const dateRegistration = new Date();
            const findUser = await db.query('SELECT * FROM users WHERE username = $1', [username])
            if (findUser.rows[0]) {
                res.send('username has already exist');
            } else {
                const newPerson = await db.query('INSERT INTO users (username, password, date_registration) values ($1, $2, $3) RETURNING *', [username, password, dateRegistration])
                res.json(newPerson.rows[0])
            }

        } catch (err) {
            console.log(err)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        const { username, password } = req.body;
        const authentic = await db.query('SELECT * FROM users where username = $1 AND password = $2', [username, password])
        if(authentic.rows[0]) {
            res.send('Authorization')
        } 
        else {
            res.send('Incorrect username or password!')
        }
    }

    async getUsers(req, res) {
        
    }
}

module.exports = new AuthController();