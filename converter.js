/* conversion factors */

const conversions = {

length:{
mm:0.001,
cm:0.01,
m:1,
km:1000,
in:0.0254,
ft:0.3048,
yd:0.9144,
mi:1609.34
},

temperature:{
C:1,
F:1,
K:1
},

mass:{
mg:0.001,
g:1,
kg:1000,
oz:28.3495,
lb:453.592
},

time:{
s:1,
min:60,
hr:3600,
day:86400
},

speed:{
"m/s":1,
"km/h":0.277778,
mph:0.44704
},

storage:{
byte:1,
KB:1000,
MB:1000*1000,
GB:1000*1000*1000,
TB:1000*1000*1000*1000
}

};


/* show converter */

function showConverter(category){

let workspace = document.getElementById("converterWorkspace");

let units = Object.keys(conversions[category]);

let options = units.map(unit =>
`<option value="${unit}">${unit}</option>`
).join("");

workspace.innerHTML = `

<h3>${category.toUpperCase()} Converter</h3>

<input type="number" id="value" placeholder="Enter value">

<br><br>

<select id="from">${options}</select>

<button id="swapBtn" onclick="swapUnits()">⇄</button>

<select id="to">${options}</select>

<br><br>

<button onclick="convertUnit('${category}')">Convert</button>

<h3 id="result"></h3>

`;

}


/* universal conversion */

function convertUnit(category){

let value = Number(document.getElementById("value").value);

let from = document.getElementById("from").value;
let to = document.getElementById("to").value;

/* special case for temperature */

if(category === "temperature"){

let result;

if(from === "C" && to === "F")
result = (value * 9/5) + 32;

else if(from === "F" && to === "C")
result = (value - 32) * 5/9;

else if(from === "C" && to === "K")
result = value + 273.15;

else if(from === "K" && to === "C")
result = value - 273.15;

else if(from === "F" && to === "K")
result = (value - 32) * 5/9 + 273.15;

else if(from === "K" && to === "F")
result = (value - 273.15) * 9/5 + 32;

else
result = value;

document.getElementById("result").innerText =
"Result = " + result;

return;

}

/* normal conversions */

let baseValue = value * conversions[category][from];

let result = baseValue / conversions[category][to];

document.getElementById("result").innerText =
"Result = " + result;

}
function swapUnits(){

let from = document.getElementById("from");
let to = document.getElementById("to");

let temp = from.value;
from.value = to.value;
to.value = temp;

}

/* enter key support */

document.addEventListener("keydown",function(e){

if(e.key==="Enter"){

let button = document.querySelector("#converterWorkspace button");

if(button){
button.click();
}

}

});