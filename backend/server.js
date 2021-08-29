const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongo = require('./config/db');


mongo.connectToServer(function (err) {

    const routes = require('./routes/reciperoute');
    const app = express();
    const port = process.env.PORT || 8080;
    app.use(cors({ origin: true, credentials: true }));

    // Init Middleware
    app.use(express.json({ extended: false }));

    //Use routes
    app.use('/recipes', routes)
    
    app.get('/', (req, res) => res.send('Hello world!'));
    app.listen(port, function (){
        console.log("")
        console.log(`Successfully connected to database!`);
        console.log(`Server running on port 8080`);
    });
})