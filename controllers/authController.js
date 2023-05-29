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
        const passwordEncriptado =  bcryptjs.hashSync(pass, salt);

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


module.exports = {
    authControllerRegister
}

