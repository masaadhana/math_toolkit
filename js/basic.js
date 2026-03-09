function appendValue(value){
document.getElementById("display").value += value;
}

function clearDisplay(){
document.getElementById("display").value = "";
}

function backspace(){
let display = document.getElementById("display");
display.value = display.value.slice(0,-1);
}

function calculate(){
let expression = document.getElementById("display").value;

try{
let result = eval(expression);
document.getElementById("display").value = result;
}
catch{
document.getElementById("display").value = "Error";
}
}

/* KEYBOARD SUPPORT */

document.addEventListener("keydown", function(event){

let key = event.key;

/* numbers */
if(key >= "0" && key <= "9"){
event.preventDefault();
appendValue(key);
}

/* operators */
else if(key === "+" || key === "-" || key === "*" || key === "/"){
event.preventDefault();
appendValue(key);
}

/* decimal */
else if(key === "."){
event.preventDefault();
appendValue(".");
}

/* brackets */
else if(key === "(" || key === ")"){
event.preventDefault();
appendValue(key);
}

/* percentage */
else if(key === "%"){
event.preventDefault();
appendValue("%");
}

/* enter = calculate */
else if(key === "Enter"){
event.preventDefault();
calculate();
}

/* backspace */
else if(key === "Backspace"){
event.preventDefault();
backspace();
}

/* escape = clear */
else if(key === "Escape"){
event.preventDefault();
clearDisplay();
}

});
