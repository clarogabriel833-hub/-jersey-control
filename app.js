let registros =
JSON.parse(localStorage.getItem("registros")) || [];

function guardarDatos(){
localStorage.setItem(
"registros",
JSON.stringify(registros)
);
}

function agregarRegistro(){

const registro = {

playera:
document.getElementById("playera").value,

talla:
document.getElementById("talla").value,

cliente:
document.getElementById("cliente").value,

costo:Number(
document.getElementById("costo").value
),

venta:Number(
document.getElementById("venta").value
),

abonado:Number(
document.getElementById("abonado").value || 0
),

estado:
document.getElementById("estado").value

};

registro.restante =
registro.venta -
registro.abonado;

registro.ganancia =
registro.venta -
registro.costo;

if(registro.restante <= 0){
registro.restante = 0;
registro.estado = "PAGADA";
}

registros.push(registro);

guardarDatos();

mostrar();

actualizarTotales();

document.getElementById("playera").value="";
document.getElementById("cliente").value="";
document.getElementById("costo").value="";
document.getElementById("venta").value="";
document.getElementById("abonado").value="";

}

function mostrar(){

let html="";

registros.forEach((r,i)=>{

html += `
<tr>
<td>${r.playera}</td>
<td>${r.talla}</td>
<td>${r.cliente}</td>
<td>$${r.venta}</td>
<td>$${r.abonado}</td>
<td>$${r.restante}</td>
<td>${r.estado}</td>
<td>
<button onclick="editar(${i})">✏️</button>
<button onclick="eliminarRegistro(${i})">🗑️</button>
</td>
</tr>
`;

});

document.getElementById("tabla").innerHTML =
html;

}

function actualizarTotales(){

let inversion=0;
let ingresos=0;
let pendiente=0;
let ganancia=0;

registros.forEach(r=>{

inversion += Number(r.costo);
ingresos += Number(r.abonado);
pendiente += Number(r.restante);
ganancia += Number(r.ganancia);

});

document.getElementById("inv").innerText =
"$"+inversion;

document.getElementById("ing").innerText =
"$"+ingresos;

document.getElementById("pen").innerText =
"$"+pendiente;

document.getElementById("gan").innerText =
"$"+ganancia;

}

function eliminarRegistro(i){

if(!confirm("¿Eliminar registro?")){
return;
}

registros.splice(i,1);

guardarDatos();

mostrar();

actualizarTotales();

}

function editar(i){

let nuevoAbono = prompt(
"Nuevo abono:",
0
);

if(nuevoAbono===null){
return;
}

registros[i].abonado +=
Number(nuevoAbono);

registros[i].restante =
registros[i].venta -
registros[i].abonado;

if(registros[i].restante <= 0){

registros[i].restante = 0;

registros[i].estado = "PAGADA";

}

guardarDatos();

mostrar();

actualizarTotales();

}

mostrar();

actualizarTotales();
