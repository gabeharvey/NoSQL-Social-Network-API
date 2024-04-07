// Imports Required for this Application
const express = require('express');
const routes = require('./routes');
const db = require('./config/connection');

const PORT = 3001;
const app = express();
const cwd = process.cwd();

// Middleware for Express
app.use(express.urlencoded ({ extended: true }));
app.use(express.json());
app.use(routes);

// This Function Starts the Server
const startServer = () => {
    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`Server Running on PORT ${PORT}`);
        });
    });
};

// This Calls the startServer Function
startServer();