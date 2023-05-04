const db = require('../db');

class AuthController {
    async registration(req, res) {
        const { username, password } = req.body;
        const dateRegistration = new Date();
        const newPerson = await db.query('INSERT INTO users (username, password, date_registration) values ($1, $2, $3) RETURNING *', [username, password, dateRegistration])
        res.json(newPerson.rows[0]);
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