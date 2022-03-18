const pwordHdr = document.getElementById("header");
const pwordEl = document.getElementById("pword");
const copyEl = document.getElementById("copy");
const msg = document.getElementById("message");
const str = document.getElementById("strenght");
const lenEl = document.getElementById("len");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const genrEl = document.getElementById("genr");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "-_^~><=@$!%*#?&";

function getUppercase(){
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getLowercase(){
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getNumber(){
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol(){
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword(){
    const len = lenEl.value;

    let password = "";

    if(upperEl.checked){
        password += getUppercase();
    }

    if(lowerEl.checked){
        password += getLowercase();
    }

    if(numberEl.checked){
        password += getNumber();
    }

    if(symbolEl.checked){
        password += getSymbol();
    }

    for(let i = password.length; i < len; i++){
        const x = generateX();
        password += x;
    }

    pwordEl.innerText = password;
}

function generateX(){
    const xs = [];

    if(upperEl.checked){
        xs.push(getUppercase());
    }

    if(lowerEl.checked){
        xs.push(getLowercase());
    }

    if(numberEl.checked){
        xs.push(getNumber());
    }

    if(symbolEl.checked){
        xs.push(getSymbol());
    }

    if(xs.length === 0) return "";

    return xs[Math.floor(Math.random() * xs.length)]
}

function validatePassword(){
    const len = lenEl.value;
    const password = pwordEl.innerText;

    var matchedCase = new Array();
    matchedCase.push("[-_^~><=@$!%*#?&]"); 
    matchedCase.push("[A-Z]");      
    matchedCase.push("[0-9]");     
    matchedCase.push("[a-z]");    

    var ctr = 0;
    for (var i = 0; i < matchedCase.length; i++) {
        if (new RegExp(matchedCase[i]).test(password)) {
            ctr++;
        }
    }

    if(!upperEl.checked && !lowerEl.checked && !numberEl.checked && !symbolEl.checked){
        ctr-=2;
    }

    if(len >= 8){
        ctr+=2;
    }

    var strenght = "";
    var color = "";
    var border = "";
    var display = "";
    switch (ctr) {
        case 0:
            strenght = "";
            color = "";
            border = "none";
            display = "none";
        break;
        case 1:
            strenght = "Péssima";
            color = "red";
            border = "1px solid red";
            display = "block";
        break;
        case 2:
            strenght = "Muito fraca";
            color = "#ff5925";
            border = "1px solid #ff5925";
            display = "block";
        break;
        case 3:
            strenght = "Fraca";
            color = "orange";
            border = "1px solid orange";
            display = "block";
        break;
        case 4:
            strenght = "Média";
            color = "yellow";
            border = "1px solid yellow";
            display = "block";
        break;
        case 5:
            strenght = "Forte";
            color = "#26d730";
            border = "1px solid #26d730";
            display = "block";
        break;
        case 6:
            strenght = "Excelente";
            color = "#16f7ac";
            border = "1px solid #16f7ac";
            display = "block";
        break;
    }
    str.innerHTML = strenght;
    msg.style.color = color;
    pwordHdr.style.border = border;
    msg.style.display = display;
}

genrEl.addEventListener("click", function(){
    
    generatePassword();
    validatePassword();
});

copyEl.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = pwordEl.innerText;

    if(!password){
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Senha Copiada");
});