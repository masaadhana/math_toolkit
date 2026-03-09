function showEquation(type){

let workspace = document.getElementById("equationWorkspace");

if(type === "linear"){

workspace.innerHTML = `
<h3>Solve Linear Equation</h3>

<input type="text" id="linearInput"
placeholder="Example: 5*x-25=2">

<p style="font-size:14px;color:#555;">
Note: Use * for multiplication (example: 5*x not 5x)
</p>

<br>

<button onclick="solveLinear()">Solve</button>

<h3 id="linearResult"></h3>
`;

}

if(type === "quadratic"){

workspace.innerHTML = `
<h3>Solve Quadratic Equation</h3>

<input type="text" id="quadInput"
placeholder="Example: x^2-5*x+6=0">

<p style="font-size:14px;color:#555;">
Note: Use * for multiplication (example: 5*x not 5x)
</p>

<br>

<button onclick="solveQuadratic()">Solve</button>

<h3 id="quadResult"></h3>
`;

}

}


/* LINEAR SOLVER */

function solveLinear(){

let eq = document.getElementById("linearInput").value;

let [left,right] = eq.split("=");

right = Number(right);

/* evaluate f(x) */

let f0 = eval(left.replace(/x/g,"(0)"));
let f1 = eval(left.replace(/x/g,"(1)"));

let a = f1 - f0;
let b = f0;

let x = (right - b) / a;

document.getElementById("linearResult").innerText =
"x = " + x;

}


/* QUADRATIC SOLVER */

function solveQuadratic(){

let eq = document.getElementById("quadInput").value
.toLowerCase()
.replace(/\s/g,"")
.replace("=0","");

/* convert 5x → 5*x */

eq = eq.replace(/(\d)x/g,"$1*x");

/* coefficients */

let a = 0, b = 0, c = 0;

let terms = eq.replace(/-/g,"+-").split("+");

terms.forEach(term=>{

if(term.includes("x^2")){
a = parseFloat(term.replace("x^2","")) || 1;
}
else if(term.includes("x")){
b = parseFloat(term.replace("x","")) || 1;
}
else if(term !== ""){
c = parseFloat(term);
}

});

/* discriminant */

let d = b*b - 4*a*c;

if(d < 0){

document.getElementById("quadResult").innerText =
"No Real Roots";

return;

}

let x1 = (-b + Math.sqrt(d))/(2*a);
let x2 = (-b - Math.sqrt(d))/(2*a);

document.getElementById("quadResult").innerText =
"x₁ = " + x1 + " , x₂ = " + x2;

}


/* ENTER KEY SUPPORT */

document.addEventListener("keydown", function(e){

if(e.key === "Enter"){

if(document.getElementById("linearInput")){
solveLinear();
}

if(document.getElementById("quadInput")){
solveQuadratic();
}

}

});