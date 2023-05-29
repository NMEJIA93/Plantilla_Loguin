const express = require('express');
const router = express.Router();
/* const{getConnection}= require('../database/connectionBD'); */

const authController = require('../controllers/authController')


// Rutas para las vistas
router.get('/', async (req, res) => {
    /* await getConnection() */
    res.render('index')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})


// rutas para los metodos del controler 
router.post('/register',authController.authControllerRegister)

module.exports = router;