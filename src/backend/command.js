
const match = require('./stringMatchingFunctions')

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.getJenis = (string) => {
    var cmd = ["kuis", "tubes", "tucil",  "ujian", "praktikum"];
    var i;
    for (i = 0; i<5; i++){
        if(match.KMPstringMatching(string, cmd[i]).length != 0 || match.KMPstringMatching(string, capitalize(cmd[i])).length != 0){
            return i+1;
        } 
    }
    
    return -1;
}

exports.constArgs = (string) => {

    var cmd = ["kuis", "tubes", "tucil",  "ujian", "praktikum"];

    var kode = string.match(/[A-Z]{2}[1234][12][0-9][0-9]/g);

    var jenis = (cmd[this.getJenis(string)-1] ? cmd[this.getJenis(string)-1]: null);

    var topik = string.match(/[A-Z]{2}[1234][12][0-9][0-9](.*)(?=([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])))/);

    var date = string.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g);

    var range = string.match(/(\d+)[^,.\d\n]+?(?=minggu|hari)/g);
    if(range != null) { 
        console.log(range);
        range = range[0];
        range = range.replace(/\s/, '');
        range = parseInt(range);
        return {
            jumlah: range,
            jenis: jenis
        }
    }
    
    if(topik != null){
        topik = topik[0].replace(/[A-Z]{2}[1234][12][0-9][0-9]/, "");
        topik = topik.replace(/\s/, '');
        topik = topik.match(/.+?(?= [padatanggal])/);
        if(topik != null){
            topik = topik[0]
        } else {
            topik = null;
        }
    } else {
        topik = null;
    }

    if(kode == null) {
        kode = [];
        kode[0] = null;
    }

    if(date == null){
        return {
            jenis: jenis,
            kode: kode[0],
            date1: null,
            date2: null,
            topik: topik,
        }
    } else if(Array.isArray(date) && date.length == 1) {
        return {
            jenis: jenis,
            kode: kode[0],
            date1: new Date(date[0]),
            date2: null,
            topik: topik
        }
    } else if(Array.isArray(date) && date.length == 2){
        return {
            jenis: jenis,
            kode: kode[0],
            date1: new Date(date[0]),
            date2: new Date(date[1]),
            topik: topik
        }
    }
}

