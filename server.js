const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const port = process.env.PORT || 3500;
const history = require("connect-history-api-fallback");


const app = express();

app.use(history());
app.use("/", express.static("./build"));

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('trust proxy',true); 

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Require routes
// database routes
require('./routes/articles.routes.js')(app);

// Location data routes
require('./routes/location.routes.js')(app);

// Google trends data routes
require('./routes/trends.routes.js')(app);

// Weather data routes
require('./routes/weather.routes.js')(app);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});