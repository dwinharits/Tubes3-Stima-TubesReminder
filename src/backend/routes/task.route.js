const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

let Task = require('../models/task');

router.route('/').pose((req, res) => {
    // get command to execute
    // get args either after or before conditional
})

router.route('/add-task').post((req, res) => {
    const newTask = new Task({
        matkul,
        jenis,
        topik,
        tanggal
    });

    newTask.save()
     .then(() => res.json('New Task added!'));
     .catch(err => res.status(400).json('Error: ' + err));
});

