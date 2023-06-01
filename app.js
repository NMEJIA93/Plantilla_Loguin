console.clear();
console.log('Hola desde el inicio del archivo app.js')

const express = require('express');
const dotenv = require('dotenv');
const cookieParse = require('cookie-parser')


dotenv.config();

const app = express();

//setear variables de entorno
/* dotenv.config({path: './env/env'})
dotenv.config({path: './env/env'}) */



const port = process.env.PORT || 3500;

// Setear el motor de plantillas
app.set('view engine', 'ejs');


// setear la carpeta publica 
app.use(express.static('public'));

//para procesar los datos enviados desde los formularios
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// para poder trabajar con las cookies
app.use(cookieParse());


// setear las rutas 
app.use('/', require('./routes/routes'));



/* app.get('/', (req, res) => {
    res.render('index')
}) */

//Para eliminar el cache y que no se pueda volver con el boton back luego de hacer el LOGOUT
app.use(function (req, res, next) {
   /*  if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
     */

    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '0');
    next()

});

app.listen(port, () => {
    console.log(`Server UP in http://localhost:${port}`);
})




