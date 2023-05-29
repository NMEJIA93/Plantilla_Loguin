const sql = require('mssql');

const dbSettings = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST,
    database: process.env.DB_DATABASE, 
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

const getConnection = async () => {
    try {
        const pool = await sql.connect(dbSettings);
        console.log('Conexion SQL Server Online');
        return pool;

    } catch (error) {
        console.log(`El error es ${error}`);
        console.log('error en el archivo de conexion');
        console.log(error)
    }
}
module.exports = { getConnection, sql }; 