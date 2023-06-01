const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { getConnection, sql } = require('../database/connectionBD');
const querySQL = require('../database/query');
const { promisify } = require('util');
const { response } = require('express');




// procedimiento para registrar
authControllerRegister = async (req, res = response) => {
    const { name, user, pass } = req.body;

    try {
        const salt = bcryptjs.genSaltSync();
        const passwordEncriptado = bcryptjs.hashSync(pass, salt);

        const pool = await getConnection();
        await pool.request()
            .input('nombre', sql.VarChar, name)
            .input('usuario', sql.VarChar, user)
            .input('pass', sql.VarChar, passwordEncriptado)
            .query(querySQL.ProductQuery.addUser);

        console.log(req.body);
        console.log('Registro guardado');
        res.redirect('/');


    } catch (error) {
        console.log(`Error en Controlador authController--> El error es ------>${error}`);
        res.status(500);
        res.send(error.message);
    }

    //bcryptjs.hash(pass, 8)
    //console.log(`usuario a registrar Nombre: ${name} - user: ${user} - contraseña: ${pass}`)

    /* console.log(pass);
    console.log(passwordEncriptado); */
}

authControllerLogin = async (req, res = response) => {
    const { user, pass } = req.body;

    try {

        if (!user || !pass) {

            res.render("login", {
                alert: true,
                alertTitle: "Error",
                alertMessage: "Ingrese un usuario y password",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 2000,
                ruta: "login",
            });
            return
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('usuario', sql.VarChar, user)
            .query(querySQL.ProductQuery.findByUser)

        const resp = result.recordset[0];

        if (!resp) {

            res.render('login', {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Usuario No Registrado",
                alertIcon: 'info',
                showConfirmButton: true,
                timer: 2000,
                ruta: 'login'
            })

            console.log('usuario no registrado')
            return
        }


        const validPassword = await bcryptjs.compareSync(pass, resp.pass);

        if (!validPassword) {
            res.render('login', {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Contraseña Incorrecta",
                alertIcon: 'info',
                showConfirmButton: true,
                timer: 2000,
                ruta: 'login'
            })
            console.log('Contraseña Incorrecta')
            return
        }

        const id = resp.usuario
        const token = jwt.sign({ id: id }, process.env.SECRETORPRIVATEKEY, {
            expiresIn: process.env.JWT_TIEMPO_EXPIRA
        })

        const cookiesOption = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        res.cookie('jwt', token, cookiesOption)
        res.render('login', {
            alert: true,
            alertTitle: "Conexion Exitosa",
            alertMessage: "¡Inicio de Sesion Correcto!",
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 800,
            ruta: ''
        })






        console.log(id)
        console.log(`Password ${resp.pass}`)
        console.log(`Password ${validPassword}`)



    } catch (error) {
        console.log(`Error en Controlador authController--> El error es ------>${error}`);
        res.status(500);
        res.send(error.message);
    }

}


isAuthenticated = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.SECRETORPRIVATEKEY)
            const pool = await getConnection();
            const result = await pool.request()
                .input('usuario', sql.VarChar, decodificada.id)
                .query(querySQL.ProductQuery.findByUser)

            const resp = result.recordset[0];



            if (!resp) {
                console.log('usuario no registrado')
                return next()
            }

            req.user = resp
            console.log(req.user.nombre)
            return next()

        } catch (error) {
            console.log(error)
            return next()
        }

    } else {
        res.redirect('/login')
    }

}

logout = (req, res) => {
    res.clearCookie('jwt')
    
    return res.redirect('/login')

}


module.exports = {
    authControllerRegister,
    authControllerLogin,
    isAuthenticated,
    logout
}

