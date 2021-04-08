require("dotenv").config({path: 'config.env'});
const express = require("express");
const cors = require("cors");
const errorHandler = require('./middlewares/errorHandler');
const path = require('path')
const { connect } = require("./connection/db");

const app = express();
app.use(express.json());
app.use(cors());

/** establish database connection */
connect();


const PORT = process.env.PORT || 5000;

// routes
app.use('/api/students', require('./routes/student.route'));

// Serve the client
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'client','build')));

    app.get('/*', (req,res)=>{
        const filePath = path.join(__dirname, "client", "build", "index.html");
        res.sendFile(filePath);
        console.log(filePath);
    })  
    
}else{
    app.get('/', (req,res)=>{
        res.send('API RUNNING');
    })
}


app.use(errorHandler);  

const server = app.listen(PORT, _=>console.log(`SERVER RUNNING AT PORT ${PORT}`));

/** Handle error on server and crash the server */
process.on('unhandledRejection', (error)=>{
    console.log(`ERROR LOG: ${error}`);
    server.close(()=>process.exit(1));
});