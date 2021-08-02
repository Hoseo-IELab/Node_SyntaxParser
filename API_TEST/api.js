const { json } = require('express');
const { stringify } = require('querystring');
const fs = require('fs');
const path = require('path');


exports.json_parse = function(playbook, jscode){
    const dataBuffer = fs.readFileSync(String(playbook)); // read JSON
    const codeBuffer = fs.readFileSync(String(jscode));  // read js code 

    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    let str = "";

    str += "input\n";
    for(let i=0; i<data.input.items.length; i++){
        let findString = "$" + String(data.input.items[i].name) + " = input['" + String(data.input.items[i].name) + "']";
    
        err = codeBuffer.indexOf(findString);
        if (err == -1){
            str += "(1:1 대응 오류) Input 코드에 "+ String(data.input.items[i].name) + " 속성이 없습니다.\n";
        }
    }
    str += "output\n";
    for(let i=0; i<data.output.items.length; i++){
        let findString = String(data.output.items[i].name) + ":";
        
        err = codeBuffer.indexOf(findString);
        if (err == -1){
            str += "(1:1 대응 오류) Output 코드에 "+ String(data.output.items[i].name) + " 속성이 없습니다.\n";
        }
    }

    return str;
}

exports.err_catch = function(codedir) {
    const fileRead = fs.readFileSync(String(codedir));
    const fr = fileRead.toString();
    const codeString = String(fr);
    
    try {
        eval(codeString);
    }catch(error)
    {
        const errorString = String(error);
        return errorString;
    }
    return "에러가 없습니다.";
}

exports.err_catch_dir = function(codedir, logdir) {
    const directoryPath1 = path.join(__dirname, codedir); // error code dir
    const directoryPath2 = path.join(__dirname, logdir);  // log output dir
    
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
    var count = 0;

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
}
        