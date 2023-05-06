const Router = require('express');
const { check } = require('express-validator');

const router = new Router();

const authController = require('../controllers/auth.controller');


router.post('/registration', [
    check('username', 'Username cannot be empty').notEmpty(),
    check('password', 'Password must be more 6 characters').isLength({min: '6'})
], authController.registration);
router.post('/login', authController.login);
router.get('/users', authController.getUsers);

module.exports = router;