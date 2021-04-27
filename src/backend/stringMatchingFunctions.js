function bruteForceCompare(string1, string2) {
    var retArray = []; // return value, array dengan index kemunuculan(kalo empty berarti gaada match)
    
    // algo brute force, kalo ga match di posisi tertentu matchingnya
    // bakal ngulang dari awal.
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
    var retArray = []; // return value, array dengan index kemunuculan(kalo empty berarti gaada match)
    var vector = createKMPlist(string2); // vektor KMP dari string2

    // algo KMP
    var i = 0; // iterator string1
    var j = 0; // iterator string2
    while(i < string1.length) {
        // kalo string1[i] == string2[j] i,j nambah 1 22nya.
        console.log(string1.charAt(i) + " and " + string2.charAt(j) + ", i = " + i + ", j = " + j);
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


/* TESTING */
var array = KMPstringMatching("ababababcabcababadababad", "ababa");

for(var i = 0; i < array.length; ++i) {
    console.log(array[i]);
}
console.log("program finished");



