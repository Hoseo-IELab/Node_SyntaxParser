function setResult() {
    var preview = document.querySelector('.preview');
    var result = document.querySelector('#result');
    var err_text = preview.innerText;
    for(let i=0; i<errorList.length; i++) {
        if(err_text.includes(errorList[i].e) == true) {
            result.innerHTML += '<p>'+errorList[i].desc+'</p>';
        }
    }
}

function setAlert() {
    const setalert = document.querySelector('#result');
    alert(setalert.textContent);
}