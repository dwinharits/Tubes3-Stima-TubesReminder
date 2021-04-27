const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send("hello world!");
})

app.listen(4000, () => {
    console.log('listening on port 3000');
})