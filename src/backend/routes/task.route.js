const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const parser = require('../command');
const matcher = require('../stringMatchingFunctions');

let Task = require('../models/task');

const url = require('url');
const { ReplSet } = require('mongodb');

router.route('/string').post((req, res) => {
    var string = req.body;
    string = string.toString();
    string = string.replace(/[?!,.;]/g, "");
    var args = parser.constArgs(string);
    var finalstring = encodeURIComponent(req.body);

    var found = false;
    
    if(!found && matcher.KMPstringMatching(string,"deadline").length != 0 || !found && matcher.KMPstringMatching(string,"kuis").length != 0 || !found && matcher.KMPstringMatching(string,"tugas").length != 0 || !found && matcher.KMPstringMatching(string,"praktikum").length != 0){

        if(matcher.KMPstringMatching(string, "minggu").length != 0 && matcher.KMPstringMatching(string, "depan").length != 0){
            found = true;
            res.redirect(302, '/chat/get-n-minggu?string=' + finalstring);
            console.log("get data n weeks from now");
        } else if (matcher.KMPstringMatching(string, "hari").length != 0 && matcher.KMPstringMatching(string, "depan").length != 0){
            found = true;
            res.redirect(302, '/chat/get-n-hari?string=' + finalstring);
            console.log("get data n days from now");
        } else if (matcher.KMPstringMatching(string, "hari").length != 0 && matcher.KMPstringMatching(string, "ini").length != 0){
            found = true;
            res.redirect(302, '/chat/get-today');
            console.log("get data today");
        } else if (matcher.KMPstringMatching(string, "antara").length != 0 && matcher.KMPstringMatching(string, "sampai").length != 0 && args.date1 != null && args.date2 != null){
            console.log("get data from date until date");
            found = true;
            res.redirect(302, '/chat/get-between-date?string=' + finalstring);
        } else if(matcher.KMPstringMatching(string, "sejauh ini").length != 0 || matcher.KMPstringMatching(string, "sekarang").length != 0){
            console.log("get all data");
            found = true;
            res.redirect(302, '/chat/get-all');
        }
    }
    
    if (!found && (matcher.KMPstringMatching(string, "ingatkan").length != 0 || matcher.KMPstringMatching(string, "tambahkan").length != 0)){
        console.log("Tambah task pada db");
        found = true;
        res.redirect(307, '/chat/add-task?string=' + finalstring);
    } 
    
    if (!found && (matcher.KMPstringMatching(string, "selesai").length != 0 || matcher.KMPstringMatching(string, "sudah dikerjakan").length != 0)){
        console.log("Delete item from db");
        found = true;
        res.redirect(307, '/chat/del-task?string=' + finalstring);
    } 
    
    if (!found && (matcher.KMPstringMatching(string, "diundur").length != 0 || matcher.KMPstringMatching(string, "diubah").length != 0 || matcher.KMPstringMatching(string, "update").length != 0)){
        console.log("Update data from db");
        found = true;
        res.redirect(307, '/chat/update-task?string=' + finalstring);
    } 

    if (!found && (matcher.KMPstringMatching(string, "tugas").length != 0 || matcher.KMPstringMatching(string, "tucil").length != 0 || matcher.KMPstringMatching(string, "tubes").length != 0) && matcher.KMPstringMatching(string, "kapan").length != 0){
        console.log("Find specific task");
        found = true;
        res.redirect(301, '/chat/get-spec?string=' + finalstring);
    }

    if(!found && (matcher.KMPstringMatching(string, "help").length != 0)){
        console.log("Help menu");
        found = true;
        var helpString = 
        "[Fitur] \n1. Menambahkan Task baru \n2. Melihat daftar task \n3. Menandai task yang sudah selesai \n4. Mengupdate deadline task \n[Daftar Kata Penting] \n1. kuis \n2. ujian \n3. tucil \n4. tubes \n5. praktikum \n";
        res.send(helpString);
    }
    
    if (!found){
        console.log("Command tidak terdaftar");
        res.send('Perintah tidak dimengerti');
    }
    
});

router.route('/add-task').post((req, res) => {
    var string = req.query.string;
    
    var data = parser.constArgs(string);
    
    var matkul = data.kode;
    var jenis = data.jenis;
    var topik = data.topik;
    var tanggal = data.date1;

    const newTask = new Task({
        matkul,
        jenis,
        topik,
        tanggal
    });

    newTask
    .save()
    .then(() => res.send('New Task added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update-task').post((req, res) => {
    var string = req.query.string;
    var context = parser.constArgs(string);
    console.log(context.kode);

    Task.findOne({matkul: context.kode})
    .then(task => {
        console.log(task)
        task.matkul = context.kode;
        task.jenis = context.jenis;
        task.tanggal = context.date1;
        
        task.save()
        .then(() => res.send("Task updated!"))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/del-task').post((req, res) => {
    var string = req.query.string;
    
    var data = parser.constArgs(string);
    console.log(data.kode);

    Task.findOneAndRemove({matkul: data.kode, jenis: data.jenis}, (err, doc) => {
        if(!doc){
            res.send("No task found");
        }

        if(err) { res.status(400).json('Error: ' + err)}
        else {
            res.send("Task deleted!");
        }
    })
});

router.route('/get-n-minggu').get((req, res) => {
    var string = req.query.string;
    var context = parser.constArgs(string);
    console.log(context.jumlah[0]);
    var today = new Date();
    var n_week = new Date(today.getFullYear(), today.getMonth(), today.getDate()+(7*context.jumlah));
    console.log(n_week);

    Task.find({tanggal: {$gte: today, $lt: n_week}}, (err, data) => {
        if(!data){
            res.send("Tidak ada deadline tubes");
        }
        if(err) {res.json({msg: "Error"})}
        else {
            var json = data;
            var output = "";
            for(var i=0; i< json.length; i++){
                var obj = json[i];
                var datestring = JSON.stringify(obj.tanggal);
                datestring = datestring.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g);
                datestring = datestring[0];
                output +=  datestring + "-" + obj.matkul + "-" + obj.jenis + "-" + obj.topik + "\n";
            }
            console.log(output);
            res.send(output);
        }
    })
});

router.route('/get-n-hari').get((req, res) => {
    var string = req.query.string;
    var context = parser.constArgs(string);

    var today = new Date();
    var n_day = new Date(today.getFullYear(), today.getMonth(), today.getDate()+(1*context.jumlah));

    Task.find({tanggal: {$gte: today, $lt: n_day}}, (err, data) => {
        if(!data){
            res.send("Tidak ada deadline tubes");
        }
        if(err) {res.json({msg: "Error"})}
        else{
            var json = data;
            var output = "";
            for(var i=0; i< json.length; i++){
                var obj = json[i];
                var datestring = JSON.stringify(obj.tanggal);
                datestring = datestring.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g);
                datestring = datestring[0];
                output +=  datestring + "-" + obj.matkul + "-" + obj.jenis + "-" + obj.topik + "\n";
            }
            console.log(output);
            res.send(output);
        }
    })
});

router.route('/get-between-date').get((req, res) => {
    var string = req.query.string;
    var context = parser.constArgs(string);

    Task.find({tanggal: {$gte: context.date1, $lt: context.date2}}, (err, data) => {
        if(!data){
            res.send("Tidak ada deadline tubes");
        }
        
        if(err) {res.json({msg: "No data found!"})}

        else {
            var json = data;
            var output = "";
            for(var i=0; i< json.length; i++){
                var obj = json[i];
                output += obj.tanggal + "-" + obj.matkul + "-" + obj.jenis + "-" + obj.topik + "/n";
            }
            res.json(output);
        }
    })
});

router.route('/get-today').get((req, res) => {
    var start = new Date();
    start.setHours(0,0,0,0);
    var end = new Date();
    end.setHours(23,59,59,999);
    Task.find({tanggal: {$gte: start, $lt: end}}, (err, data) => {
        if(!data){
            res.send("Tidak ada deadline tubes");
        }

        if(err) {res.json({msg: "No data found!"})}

        else {
            var json = data;
            var output = "";
            for(var i=0; i< json.length; i++){
                var obj = json[i];
                var datestring = JSON.stringify(obj.tanggal);
                datestring = datestring.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g);
                datestring = datestring[0];
                output +=  datestring + "-" + obj.matkul + "-" + obj.jenis + "-" + obj.topik + "\n";
            }
            console.log(output);
            res.send(output);
        }
    })
});

router.route('/get-all').get((req, res) => {
    Task.find((err, data) => {
        if(!data){
            res.send("Tidak ada deadline tubes");
        }

        if(err){
            res.json({msg: "No data found!"})
        }
        else {
            var json = data;
            var output = "Deadline keseluruhan: \n";
            for(var i=0; i< json.length; i++){
                var obj = json[i];
                var datestring = JSON.stringify(obj.tanggal);
                datestring = datestring.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g);
                datestring = datestring[0];
                output +=  datestring + "-" + obj.matkul + "-" + obj.jenis + "-" + obj.topik + "\n";
            }
            console.log(output);
            res.send(output);
        }
    })
});

router.route('/get-spec').get((req, res) => {
    var string = req.query.string;
    var context = parser.constArgs(string);
    console.log(context.kode);
    Task.findOne({matkul: context.kode},(err, data) => {
        if(!data){
            res.send("Tidak ada deadline tubes");
        }

        if(err){
            res.json({msg: "No data found!"})
        }
        else {
            var json = data;
            var output = "Deadline: \n";
            for(var i=0; i< json.length; i++){
                var obj = json[i];
                var datestring = JSON.stringify(obj.tanggal);
                datestring = datestring.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g);
                datestring = datestring[0];
                output +=  datestring + "-" + obj.matkul + "-" + obj.jenis + "-" + obj.topik + "\n";
            }
            console.log(output);
            res.send(output);
        }
    })
});

module.exports = router;