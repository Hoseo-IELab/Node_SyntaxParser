const { json } = require('express');
const { stringify } = require('querystring');
const fs = require('fs');
const path = require('path');

const codeDirPath = path.join(__dirname, '../jsonParser/playbookCode');
const dataBuffer = fs.readFileSync('jsonParser/playbook.json'); // read JSON
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);



fs.readdir(codeDirPath, function (err, files){
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    // listening all files using forEach
    files.forEach(function (file){
        const codeBuffer = String(fs.readFileSync(codeDirPath + '/' + file));  // read js code 


        for(let i=0; i<data.input.items.length; i++){
            let findString = "$" + String(data.input.items[i].name) + " = input['" + String(data.input.items[i].name) + "']";
        
            err = codeBuffer.indexOf(findString);
            if (err == -1){
                console.log("코드에 "+ String(data.input.items[i].name) + "가 없습니다.");
            }
        }
        
        console.log();
        for(let i=0; i<data.output.items.length; i++){
            let findString = String(data.output.items[i].name) + ":";
            
            err = codeBuffer.indexOf(findString);
            if (err == -1){
                console.log("코드에 "+ String(data.output.items[i].name) + "가 없습니다.");
            }
        }
    })
});
