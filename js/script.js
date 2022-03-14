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
const symbols = "\|!@#$%¨&*()-_=+[]}{/?;:.><,'";

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

    if(!upperEl.checked && !lowerEl.checked && !numberEl.checked && !symbolEl.checked){
        msg.style.display = "none";
        pwordHdr.style.border = "none";
        pwordEl.innerText = "";
        return;
    }
    
    if(len >= 4 && len <= 6) {
        str.innerHTML = "Fraca";
        msg.style.color = "#ff5925";
        pwordHdr.style.border = "1px solid #ff5925";
    }
    else if(len > 6 && len < 9){
        str.innerHTML = "Média";
        msg.style.color = "yellow";
        pwordHdr.style.border = "1px solid yellow";
    }
    else if(len >= 9 ){
        str.innerHTML = "Forte";
        msg.style.color = "#26d730";
        pwordHdr.style.border = "1px solid #26d730";
    }

}

genrEl.addEventListener("click", function(){

    msg.style.display = "block";
    
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