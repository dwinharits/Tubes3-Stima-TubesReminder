
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
    var date = string.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g);
    var kode = string.match(/[A-Z]{2}[12][12][0-9][0-9]/g);
    var jenis = cmd[getJenis(string)-1];
    if(date == null){
        return {
            jenis: jenis,
            kode: kode[0],
            date1: null,
            date2: null
        }
    } else if(Array.isArray(date) && date.length == 1) {
        return {
            jenis: jenis,
            kode: kode[0],
            date1: date[0],
            date2: null
        }
    } else {
        return {
            jenis: jenis,
            kode: kode[0],
            date1: date[0],
            date2: date[1]
        }
    }
}
