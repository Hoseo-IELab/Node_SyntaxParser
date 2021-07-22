var fs = require('fs');

const fileRead = fs.readFileSync("code.txt");
const fr = fileRead.toString().split('\n');
const codeString = String(fr);

try{
    eval(codeString);
}catch(error)
{
    const errorString = String(error);
    //console.log(errorString);
    var file = 'errorLOG.txt';
    fs.writeFile('errorLOG.txt', errorString, 'utf8', function(error){
        console.log("write end")
    });
}