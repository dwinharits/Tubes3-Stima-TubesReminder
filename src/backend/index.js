const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const taskRoute = require('./routes/task.route');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended: true}));


const url = "mongodb+srv://dan:gokil2015@cluster0.1jcsm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("Connection succesfull");
})


app.use('/chat', taskRoute);


app.get('/', (req, res) => {
    res.send("hello world!");
})

app.listen(4000, () => {
    console.log('listening on port 3000');
})