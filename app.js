const express = require('express');
const path = require('path');
var genuuid = require('uuid').v4;
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
//app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

const api = require('./server/api');
const list = require('./server/list');
const brand = require('./server/brand');
const db = require('./server/db');

//Configure .env
require('dotenv').config();

//Set port as process.env.PORT if it is present otherwise set it to 4000
const port = process.env.PORT || 4000;
//const port = 27017;
//Initiate connection with database
db.connect({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}).then(() => {
    //Handle /api with the api middleware
    app.use('/api', session({
        genid() {
            return genuuid() // use UUIDs for session IDs
        },
        store: new MongoStore({ client: db.getClient() }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    }), api);

    app.use('/list', session({
        genid() {
            return genuuid() // use UUIDs for session IDs
        },
        store: new MongoStore({ client: db.getClient() }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    }), list);

    app.use('/brand', session({
        genid() {
            return genuuid() // use UUIDs for session IDs
        },
        store: new MongoStore({ client: db.getClient() }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    }), brand);

    //Handle non-api routes with static build folder
    app.use(express.static(path.join(__dirname, 'build')));

    //Return index.html for routes not handled by build folder
    app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

    //Start listening on port
    app.listen(port, () => {
        console.log(`Server listening at port: ${port}`);
    });
});