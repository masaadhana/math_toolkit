function plotGraph(){

let input = document.getElementById("functionInput").value;

let xValues = [];
let yValues = [];

for(let x = -10; x <= 10; x += 0.1){

let expr = input;

expr = expr
.replace(/sin/g,"Math.sin")
.replace(/cos/g,"Math.cos")
.replace(/tan/g,"Math.tan")
.replace(/sqrt/g,"Math.sqrt")
.replace(/log/g,"Math.log")
.replace(/\^/g,"**");

expr = expr.replace(/x/g, `(${x})`);

xValues.push(x);

try{

let y = eval(expr);

yValues.push(y);

}
catch{

yValues.push(null);

}

}

let trace = {
x: xValues,
y: yValues,
mode: "lines",
type: "scatter"
};

let layout = {
margin:{t:20},
xaxis:{title:"x (radians)"},
yaxis:{title:"y"}
};

Plotly.newPlot("graph",[trace],layout);

}

/* allow Enter key plotting */

document.getElementById("functionInput").addEventListener("keydown", function(event){

if(event.key === "Enter"){

event.preventDefault();
plotGraph();

}

});