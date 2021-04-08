const ExceptionHandler = require('../utils/ExceptionHandler');

const errorHandler = (err, req, res, next) =>{
    let error = { ...err };
    error.message = err.message;
    console.log(err)
    
    if(err.code === 11000){
        const message = 'Please provide a unique information.';
        error = new ExceptionHandler(message, 400);
    }
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message);
        error = new ExceptionHandler(message, 400);
    }
    if(err.name === 'TypeError'){
        const message = "Search not found.";
        error = new ExceptionHandler(message, 404);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Internal Server Error.",
    })  
}

module.exports = errorHandler;