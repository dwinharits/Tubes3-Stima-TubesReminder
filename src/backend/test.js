const matcher = require('./stringMatchingFunctions');
const parser = require('./command');
const readline = require('readline');


function parseInput(string){

    string = string.replace(/[?!,.;]/g, "");

    var args = parser.constArgs(string);

    var found = false;
    
    if(!found && matcher.KMPstringMatching(string,"deadline").length != 0 || !found && matcher.KMPstringMatching(string,"kuis").length != 0 || !found && matcher.KMPstringMatching(string,"tugas").length != 0 || !found && matcher.KMPstringMatching(string,"praktikum").length != 0){

        if(matcher.KMPstringMatching(string, "minggu").length != 0 && matcher.KMPstringMatching(string, "depan").length != 0){
            found = true;
            console.log("get data n weeks from now");
        } else if (matcher.KMPstringMatching(string, "hari").length != 0 && matcher.KMPstringMatching(string, "depan").length != 0){
            found = true;
            console.log("get data n days from now");
        } else if (matcher.KMPstringMatching(string, "hari").length != 0 && matcher.KMPstringMatching(string, "ini").length != 0){
            found = true;
            console.log("get data today");
        } else if (matcher.KMPstringMatching(string, "antara").length != 0 && matcher.KMPstringMatching(string, "sampai").length != 0 && args.date1 != null && args.date2 != null){
            console.log("get data from date until date");
            found = true;
        } else if(matcher.KMPstringMatching(string, "sejauh ini").length != 0 || matcher.KMPstringMatching(string, "sekarang").length != 0){
            console.log("get all data");
            found = true;
        }
    }
    
    if (!found && (matcher.KMPstringMatching(string, "ingatkan").length != 0 || matcher.KMPstringMatching(string, "tambahkan").length != 0)){
        console.log("Tambah task pada db");
        found = true;
    } 
    
    if (!found && (matcher.KMPstringMatching(string, "selesai").length != 0 || matcher.KMPstringMatching(string, "sudah dikerjakan").length != 0)){
        console.log("Delete item from db");
        found = true;
    } 
    
    if (!found && (matcher.KMPstringMatching(string, "diundur").length != 0 || matcher.KMPstringMatching(string, "diubah").length != 0 || matcher.KMPstringMatching(string, "update").length != 0)){
        console.log("Update data from db");
        found = true;
    } 

    if (!found && (matcher.KMPstringMatching(string, "tugas").length != 0 || matcher.KMPstringMatching(string, "tucil").length != 0 || matcher.KMPstringMatching(string, "tubes").length != 0) && matcher.KMPstringMatching(string, "kapan").length != 0){
        console.log("Find specific task");
        found = true;
    }

    if(!found && (matcher.KMPstringMatching(string, "help").length != 0)){
        console.log("Help menu");
        found = true;
    }
    
    if (!found){
        console.log("Command tidak terdaftar");
    }
}

parseInput("help");