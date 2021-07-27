var express = require('express');
var router = express.Router();
// Add code
const path = require('path');
const fs = require('fs');
const directoryPath1 = path.join(__dirname, '../error-codes');
const directoryPath2 = path.join(__dirname, '../errorList');
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

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node Parser in IE Lab' });
  fs.readdir(directoryPath1, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file);
        const fileRead = fs.readFileSync(directoryPath1+'/'+file);
        const fr = fileRead.toString();
        const codeString = String(fr);

        try {
            eval(codeString);
        }catch(error)
        {
            count += 1;
            const errorString = String(error);
            console.log(purchaseDay);
            fs.writeFile(directoryPath2+'/'+purchaseDay+'_'+count+'.txt', errorString, 'utf8', function(error){
                console.log("write end");
            });
        }
    });
  });
});

router.post('/', function(req, res, next) {
  res.render('index', { title: 'Node Parser in IE Lab' });
  fs.readdir(directoryPath1, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    console.log(files);
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file);
        const fileRead = fs.readFileSync(directoryPath1+'/'+file);
        const fr = fileRead.toString();
        const codeString = String(fr);

        try {
            console.log(codeString);
            eval(codeString);
        }catch(error)
        {
            count += 1;
            const errorString = String(error);
            console.log(purchaseDay);
            fs.writeFile(directoryPath2+'/'+purchaseDay+'_'+count+'.txt', errorString, 'utf8', function(error){
                console.log("write end");
            });
        }
    });
  });
});

module.exports = router;
