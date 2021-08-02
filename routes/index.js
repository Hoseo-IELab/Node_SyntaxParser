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

//json Parser

//json Parser_end
const { json } = require('express');
const { stringify } = require('querystring');

const codeDirPath = path.join(__dirname, '../jsonParser/playbookCode');
const dataBuffer = fs.readFileSync('jsonParser/playbook.json'); // read JSON
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', {title: 'Node Parser in IE Lab' });
  res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
});

router.post('/syntax', function(req, res, next) {
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
  res.redirect("/");
});

router.post('/json', function(req, res, next) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    fs.readdir(codeDirPath, function (err, files){
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        // listening all files using forEach
        files.forEach(function (file){
            const codeBuffer = String(fs.readFileSync(codeDirPath + '/' + file));  // read js code 
            let alertStr = "";
    
            for(let i=0; i<data.input.items.length; i++){
                

                let findString = "$" + String(data.input.items[i].name) + " = input['" + String(data.input.items[i].name) + "']";
            
                err = codeBuffer.indexOf(findString);
                if (err == -1){
                    alertStr += "(1:1 대응 오류) Input 코드에 " + String(data.input.items[i].name) + " 속성이 없습니다.";
                }
            }
            console.log();
            for(let i=0; i<data.output.items.length; i++){
                let findString = String(data.output.items[i].name) + ":";
                
                err = codeBuffer.indexOf(findString);
                if (err == -1){
                    alertStr += "(1:1 대응 오류) Output 코드에 " + String(data.output.items[i].name) + " 속성이 없습니다.";
                }
            }
            
            if(alertStr == ""){
                alertStr = "속성과 코드가 일치합니다.";
            }

            
            
            console.log(alertStr);
            //res.send(alertStr);
            res.write(`<script type="text/javascript" charset="utf-8">alert("${alertStr}");location.href=\'/\';</script>`);
            //res.write("<script>location.href=\'/\'</script>");
        })
    });

    
  });


module.exports = router;
