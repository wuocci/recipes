const express = require('express');
const cors = require('cors');
const mongo = require('./config/db')

const db = require("./models");
const Role = db.role;

const app = express();
const port = process.env.PORT || 8080;


const reciperoute = require('./routes/recipe_routes'); 
const { connectToServer } = require('./config/db');
 
var corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.json({ extended: false }));

//Use routes
require('./routes/auth_routes')(app);
require('./routes/user_routes')(app); 
app.use('/recipes', reciperoute)

app.get('/', (req, res) => res.send('Hello world!'));

app.listen(port, function (){
console.log("")
console.log(`Server running on port 8080`);
});

db.mongoose
  .connect(mongo.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

    function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
        new Role({
            name: "user"
        }).save(err => {
            if (err) {
            console.log("error", err);
            }

            console.log("added 'user' to roles collection");
        });

        new Role({
            name: "moderator"
        }).save(err => {
            if (err) {
            console.log("error", err);
            }

            console.log("added 'moderator' to roles collection");
        });

        new Role({
            name: "admin"
        }).save(err => {
            if (err) {
            console.log("error", err);
            }

            console.log("added 'admin' to roles collection");
        });
        }
  });
}
