function showOperation(type){

let workspace = document.getElementById("matrixWorkspace");

workspace.innerHTML = `
<h3>Select Matrix Size</h3>

<button onclick="createMatrix('${type}',2)">2 × 2</button>
<button onclick="createMatrix('${type}',3)">3 × 3</button>
`;

}

function createMatrix(operation,size){

let workspace = document.getElementById("matrixWorkspace");

let matrixHTML = "<h3>Enter Matrix</h3>";

matrixHTML += "<div class='matrix-layout'>";

/* MATRIX A */

matrixHTML += "<div>";
matrixHTML += "<h4>Matrix A</h4>";
matrixHTML += "<div class='matrix-box'>";

for(let i=0;i<size;i++){

matrixHTML += "<div class='matrix-row'>";

for(let j=0;j<size;j++){

matrixHTML += `<input type="number" id="A${i}${j}">`;

}

matrixHTML += "</div>";
}

matrixHTML += "</div>";
matrixHTML += "</div>";
if(operation === "add") matrixHTML += "<h2> + </h2>";
if(operation === "subtract") matrixHTML += "<h2> − </h2>";
if(operation === "multiply") matrixHTML += "<h2> × </h2>";

/* MATRIX B */

if(
operation !== "determinant" &&
operation !== "transpose" &&
operation !== "minor" &&
operation !== "cofactor" &&
operation !== "adjoint" &&
operation !== "inverse"
){

matrixHTML += "<div>";
matrixHTML += "<h4>Matrix B</h4>";
matrixHTML += "<div class='matrix-box'>";

for(let i=0;i<size;i++){

matrixHTML += "<div class='matrix-row'>";

for(let j=0;j<size;j++){

matrixHTML += `<input type="number" id="B${i}${j}">`;

}

matrixHTML += "</div>";
}

matrixHTML += "</div>";
matrixHTML += "</div>";

}

matrixHTML += `
<div>
<br>
<button onclick="calculateMatrix('${operation}',${size})">
Calculate
</button>

<div id="matrixResult" class="matrix-box"></div>
</div>
`;

matrixHTML += "</div>";

workspace.innerHTML = matrixHTML;

}

function calculateMatrix(operation,size){

let result = [];

for(let i=0;i<size;i++){
result[i] = [];
}

/* ADDITION */

if(operation === "add"){

for(let i=0;i<size;i++){
for(let j=0;j<size;j++){

let a = Number(document.getElementById(`A${i}${j}`).value);
let b = Number(document.getElementById(`B${i}${j}`).value);

result[i][j] = a + b;

}
}

}

/* SUBTRACTION */

if(operation === "subtract"){

for(let i=0;i<size;i++){
for(let j=0;j<size;j++){

let a = Number(document.getElementById(`A${i}${j}`).value);
let b = Number(document.getElementById(`B${i}${j}`).value);

result[i][j] = a - b;

}
}

}

/* MULTIPLICATION */

if(operation === "multiply"){

for(let i=0;i<size;i++){
for(let j=0;j<size;j++){

result[i][j] = 0;

for(let k=0;k<size;k++){

let a = Number(document.getElementById(`A${i}${k}`).value);
let b = Number(document.getElementById(`B${k}${j}`).value);

result[i][j] += a*b;

}

}
}

}

/* TRANSPOSE */

if(operation === "transpose"){

for(let i=0;i<size;i++){
for(let j=0;j<size;j++){

result[i][j] =
Number(document.getElementById(`A${j}${i}`).value);

}
}

}

/* DETERMINANT */

if(operation === "determinant"){

if(size === 2){

let a = Number(document.getElementById("A00").value);
let b = Number(document.getElementById("A01").value);
let c = Number(document.getElementById("A10").value);
let d = Number(document.getElementById("A11").value);

let det = a*d - b*c;

document.getElementById("matrixResult").innerHTML =
"<h3>Determinant = "+det+"</h3>";

return;

}

}

/* MINOR MATRIX */

if(operation === "minor"){

for(let i=0;i<size;i++){
for(let j=0;j<size;j++){

let sub=[];

/* build submatrix */

for(let r=0;r<size;r++){
if(r===i) continue;

let row=[];

for(let c=0;c<size;c++){
if(c===j) continue;

row.push(Number(document.getElementById(`A${r}${c}`).value));
}

sub.push(row);
}

/* determinant of minor */

let det;

if(size===2){
/* minor of 2x2 is single remaining element */
det = sub[0][0];
}
else{
/* determinant of 2x2 minor (for 3x3 matrix) */
det = sub[0][0]*sub[1][1] - sub[0][1]*sub[1][0];
}

result[i][j] = det;

}
}

}

/* COFACTOR */

if(operation === "cofactor"){

for(let i=0;i<size;i++){
for(let j=0;j<size;j++){

let sub=[];

for(let r=0;r<size;r++){
if(r===i) continue;

let row=[];

for(let c=0;c<size;c++){
if(c===j) continue;

row.push(Number(document.getElementById(`A${r}${c}`).value));
}

sub.push(row);
}

let det=sub[0][0]*sub[1][1]-sub[0][1]*sub[1][0];

result[i][j]=((i+j)%2===0?1:-1)*det;

}
}

}

/* ADJOINT */

if(operation === "adjoint"){

let cof=[];

for(let i=0;i<size;i++){
cof[i]=[];

for(let j=0;j<size;j++){

let sub=[];

for(let r=0;r<size;r++){
if(r===i) continue;

let row=[];

for(let c=0;c<size;c++){
if(c===j) continue;

row.push(Number(document.getElementById(`A${r}${c}`).value));
}

sub.push(row);
}

let det=sub[0][0]*sub[1][1]-sub[0][1]*sub[1][0];

cof[i][j]=((i+j)%2===0?1:-1)*det;

}
}

for(let i=0;i<size;i++){
for(let j=0;j<size;j++){
result[i][j]=cof[j][i];
}
}

}

/* INVERSE */

if(operation === "inverse"){

let a=Number(document.getElementById("A00").value);
let b=Number(document.getElementById("A01").value);
let c=Number(document.getElementById("A10").value);
let d=Number(document.getElementById("A11").value);

let det=a*d-b*c;

if(det===0){
document.getElementById("matrixResult").innerHTML=
"Matrix not invertible";
return;
}

result=[
[d/det,-b/det],
[-c/det,a/det]
];

}

/* DISPLAY RESULT */

let resultHTML="";

for(let i=0;i<size;i++){

resultHTML+="<div class='matrix-row'>";

for(let j=0;j<size;j++){

resultHTML+=`<input value="${result[i][j]}" readonly>`;

}

resultHTML+="</div>";
}

document.getElementById("matrixResult").innerHTML=resultHTML;

}
document.addEventListener("keydown", function(event){

if(event.key === "Enter"){

let button = document.querySelector("#matrixWorkspace button");

if(button){
button.click();
}

}

});
document.getElementById("matrixWorkspace")
.addEventListener("keydown", function(event){

if(event.key === "Enter"){

event.preventDefault();

let button = document.querySelector("#matrixWorkspace button");

if(button){
button.click();
}

}

});
document.addEventListener("input", function(event){

if(event.target.tagName === "INPUT" && event.target.type === "number"){

let inputs = Array.from(
document.querySelectorAll("#matrixWorkspace input")
);

let index = inputs.indexOf(event.target);

if(index > -1 && index < inputs.length - 1){

inputs[index + 1].focus();

}

}

});
