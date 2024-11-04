const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//start service
const app = express();

// Base de datos.
dbConnection();

// CORS
app.use( cors() );

// Public middleware
app.use( express.static('public'));

// Parse json body
app.use( express.json() );

//Routes
app.use('/api/auth', require('./routes/auth'));

// listen for requests.
app.listen( process.env.PORT, ()=>{
    console.log(`Server running in port ${process.env.PORT}`);
});