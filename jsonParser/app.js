const { json } = require('express');
const fs = require('fs');
const { stringify } = require('querystring');

const dataBuffer = fs.readFileSync('playbook.json'); // read JSON
const dataJSON = dataBuffer.toString();

const data = JSON.parse(dataJSON);

const codeBuffer = String(fs.readFileSync("playbook.js"));  // read js code 



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