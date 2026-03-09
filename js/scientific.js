let expression = "";
let angleMode = "deg";

/* update display */

function updateDisplay(){
document.getElementById("expression").textContent = expression;
}

/* append values */

function appendValue(value){
expression += value;
updateDisplay();
}

/* clear */

function clearDisplay(){
expression = "";
document.getElementById("expression").textContent = "";
document.getElementById("result").textContent = "0";
}

/* calculate */

function calculate(){

try{

let exp = expression
.replace(/π/g,"pi")
.replace(/√/g,"sqrt");

/* convert trig only if DEG mode */

if(angleMode === "deg"){

exp = exp
.replace(/sin\((.*?)\)/g,"sin(($1)*pi/180)")
.replace(/cos\((.*?)\)/g,"cos(($1)*pi/180)")
.replace(/tan\((.*?)\)/g,"tan(($1)*pi/180)");

}

let result = math.evaluate(exp);

document.getElementById("result").textContent = result;

}

catch{

document.getElementById("result").textContent = "Error";

}

}

/* keyboard support */

document.addEventListener("keydown", function(event){

let key = event.key;

if(key >= "0" && key <= "9"){
event.preventDefault();
appendValue(key);
}

else if(key === "+" || key === "-" || key === "*" || key === "/"){
event.preventDefault();
appendValue(key);
}

else if(key === "."){
event.preventDefault();
appendValue(".");
}

else if(key === "(" || key === ")"){
event.preventDefault();
appendValue(key);
}

else if(key === "^"){
event.preventDefault();
appendValue("^");
}

else if(key === "%"){
event.preventDefault();
appendValue("%");
}

else if(key === "Enter"){
event.preventDefault();
calculate();
}

else if(key === "Backspace"){
event.preventDefault();
expression = expression.slice(0,-1);
updateDisplay();
}

else if(key === "Escape"){
event.preventDefault();
clearDisplay();
}

});

/* DEG RAD toggle */

const toggle = document.getElementById("angleToggle");

toggle.addEventListener("change", function(){

if(toggle.checked){

angleMode = "rad";

document.getElementById("radLabel").classList.add("active");
document.getElementById("degLabel").classList.remove("active");

}
else{

angleMode = "deg";

document.getElementById("degLabel").classList.add("active");
document.getElementById("radLabel").classList.remove("active");

}

});
