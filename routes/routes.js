const express = require('express');
const router = express.Router();
/* const{getConnection}= require('../database/connectionBD'); */

const authController = require('../controllers/authController')


// Rutas para las vistas
router.get('/',authController.isAuthenticated,  (req, res) => {
    /* await getConnection() */
    res.render('index',{user:req.user.nombre})
})

router.get('/login', (req, res) => {
    res.render('login'/* ,{alert:false} */)
})

router.get('/register', (req, res) => {
    res.render('register')
})


// rutas para los metodos del controler 
router.post('/register',authController.authControllerRegister);
router.post('/login',authController.authControllerLogin);
router.get('/logout',authController.logout);


module.exports = router;