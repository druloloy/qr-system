const mongoose = require('mongoose');


exports.connect = ()=>{
    mongoose.connect(process.env.ATLAS_URI, {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true
    })

    console.log("Connected to the Database.");
}