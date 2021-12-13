'use strict';

const mongoose = require("mongoose");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const uri = `mongodb+srv://${config.cluster}/${config.database}?retryWrites=true/${config.database}`;

const mongooseConnection = {
    dbName: config.database,
    user: config.username,
    pass: config.password,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const dbConnection = async() => {
    await mongoose.connect(uri, mongooseConnection);
    //Get the default connection
    const db = mongoose.connection;
    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
};

module.exports = dbConnection;