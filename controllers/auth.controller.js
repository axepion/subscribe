class AuthController {
    registration(req, res) {
        const { name, email, password } = req.body;
        res.send('Success');
    }

    login(req, res) {
        const { name, email, password } = req.body;
        if(name == 'vadim' && email == 'test@test' && password == '123123') {
            res.send('You are authorized')
        } 
        else {
            res.send('You are banned!')
        }
    }
}

module.exports = new AuthController();