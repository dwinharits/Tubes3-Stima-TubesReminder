function bruteForceCompare(string1, string2) {
    var retArray = []; // return value, array dengan index kemunuculan(kalo empty berarti gaada match)
    
    // algo brute force, kalo ga match di posisi tertentu matchingnya bakal ngulang dari awal.
    var i = 0;
    for(;i < string1.length; ++i){
        var j = 0;
        var k = i;
        for(;j < string2.length; ++j) {
            if(string1.charAt(k) != string2.charAt(j)) {
                break;
            }
            k++;
        }
        if(j == string2.length) {
            retArray.push(i);
        }
    }

    return retArray;
}

// fungsi untuk membuat vektor di algo KMP
function createKMPlist(word) {
    var retArray = []; // return value
    retArray.push(0); // first element of retArray

    var i = 1;
    var j = 0;
    while(i < word.length) {
        if(word.charAt(i) == word.charAt(0+j)) {
            j++;
        }
        else {
            j = 0;
        }
        retArray.push(j);
        i++;
    }
    return retArray;
}

// fungsi string matching dengan KMP
function KMPstringMatching(string1, string2) {
/* 
    input: 
    string1 : teks yang pingin jadi tempat nyari pattern (string)
    string2 : pattern yang mau dicari (string)
    
    output:
    retArray : kumpulan index pattern di teks, kalo empty berarti gaada pattern di teks.
*/
    var retArray = []; // return value, array dengan index kemunuculan(kalo empty berarti gaada match)
    var vector = createKMPlist(string2); // vektor KMP dari string2

    // algo KMP
    var i = 0; // iterator string1
    var j = 0; // iterator string2
    while(i < string1.length) {
        // kalo string1[i] == string2[j] i,j nambah 1 22nya.
        if(string1.charAt(i) == string2.charAt(j)) {
            i++;
            j++;
        }

        // kalo ngga match
        else {
            // kalo j nya 0 berarti emang ngga match, i ditambah 1
            if(j == 0) {
                i++;
            }
            // kalo j ngga 0 jnya diganti ke vector ke j-1
            else {
                j = vector[j-1];
            }
        }

        // kalo j == panjang string2 berarti ketemu match
        if(j == string2.length) {
            retArray.push(i-string2.length); // append index matching, yaitu i-panjang string2
            j = 0; // j dibalikin ke 0.
        }
    }

    return retArray;
}   

function createBadMatchTable(word) {
    var retArray = [];
    var wLength = word.length;

    for(var i = 0; i < wLength; ++i) {
        var udahAda = false;

        var j = 0;
        for(; j < i; ++j) {
            if(word.charAt(j) == word.charAt(i)) {
                udahAda = true;
                break;
            }
        }

        if(udahAda) {
            if(wLength-i-1 > 1) {
                retArray[j] = wLength-i-1;
            }
            else {
                retArray[j] = 1;
            }
        }
        else {
            if(wLength-i-1 > 1) {
                retArray.push(wLength-i-1);
            }
            else {
                retArray.push(1);
            }
        }
    }
    retArray.push(wLength);

    return retArray;
}

function BoyerMooreStringMatching(string1, string2) {
/*
input : 
    string1 : teks yang pingin jadi tempat nyari pattern (string)
    string2 : pattern yang mau dicari (string)

ouput :
    i : indeks pertama pattern di teks, kalo -1 berarti ngga ada.
*/
    var vector = createBadMatchTable(string2);
    
    var i = 0;
    var j = string2.length-1;
    while(i < string1.length) {
        if(string1.charAt(i+j) == string2.charAt(j)) {
            j--;
        }
        else {
            var k = 0;
            for(; k < vector.length-1; ++k) {
                if(string1.charAt(i+j)==string2.charAt(k)) {
                    break;
                }
            }
            i = i+vector[k];
        }

        if(j == -1) {
            return i;
        }
    }
    return -1;
}       

/* TESTING */
var index = BoyerMooreStringMatching("", "ah");
var array = KMPstringMatching("no", "test");

for(var i = 0; i < array.length; ++i) {
    console.log(array[i]);
}

console.log(index);
console.log("program finished");



