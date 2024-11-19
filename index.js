import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();
import { dbConnection } from './database/config.js'
import { logRequest } from './middlewares/logRequest.js'

import authRouter from './routes/auth.js'
import llmRouter from './routes/llm.js'

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

// log requests.
app.use( logRequest );

//Routes
app.use('/api/auth', authRouter);
app.use('/api/llm', llmRouter); 


// listen for requests.
app.listen( process.env.PORT, ()=>{
    console.log(`Server running in port ${process.env.PORT}`);
});