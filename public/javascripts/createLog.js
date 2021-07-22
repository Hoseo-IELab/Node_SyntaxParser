const path = require('path');
const fs = require('fs');
const directoryPath = path.join(__dirname, '../../test');
var count = 0;

// Get Date Format YY-mm-dd HH:mm:ss
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
month = month >= 10 ? month : '0' + month;
let day = date.getDate();
day = day >= 10 ? day : '0' + day;
let hour = date.getHours();
hour = hour >= 10 ? hour : '0' + hour;
let min = date.getMinutes();
let sec = date.getSeconds();
sec = sec >= 10 ? sec : '0' + sec;
let purchaseDay = year + '-' + month + '-' + day + '_' + hour + '-' + min + '-' + sec;

function createLog() {
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log(file);
            const fileRead = fs.readFileSync('../../test/'+file);
            const fr = fileRead.toString();
            const codeString = String(fr);
    
            try {
                eval(codeString);
            }catch(error)
            {
                count += 1;
                const errorString = String(error);
                console.log(purchaseDay);
                console.log(str_getDate);
                fs.writeFile('../../test/'+purchaseDay, errorString, 'utf8', function(error){
                    console.log("write end");
                });
            }
        });
    });
}

fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file);
        const fileRead = fs.readFileSync('../../test/'+file);
        const fr = fileRead.toString();
        const codeString = String(fr);

        try {
            eval(codeString);
        }catch(error)
        {
            count += 1;
            const errorString = String(error);
            console.log(purchaseDay);
            fs.writeFile('../../test/'+purchaseDay, errorString, 'utf8', function(error){
                console.log("write end");
            });
        }
    });
});