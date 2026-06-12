let registros =
JSON.parse(localStorage.getItem("registros")) || [];

function guardarDatos(){
localStorage.setItem(
"registros",
JSON.stringify(registros)
);
}

function agregarRegistro(){

if(!document.getElementById("playera")){
return;
}

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

alert("✅ Jersey guardado");

document.getElementById("playera").value="";
document.getElementById("cliente").value="";
document.getElementById("costo").value="";
document.getElementById("venta").value="";
document.getElementById("abonado").value="";

}

function cargarInventario(){

const contenedor =
document.getElementById(
"contenedorInventario"
);

if(!contenedor){
return;
}

let html="";

registros.forEach((r,i)=>{

let claseEstado="stk";

if(r.estado==="EN CAMINO"){
claseEstado="camino";
}

if(r.estado==="ENTREGADA"){
claseEstado="entregada";
}

if(r.estado==="PAGADA"){
claseEstado="pagada";
}

html += `
<div class="jersey-card">

<h3>⚽ ${r.playera}</h3>

<p>📏 ${r.talla}</p>

<p>👤 ${r.cliente}</p>

<p>💰 Venta: $${r.venta}</p>

<p>💵 Abonado: $${r.abonado}</p>

<p>⏳ Restante: $${r.restante}</p>

<div class="estado ${claseEstado}">
${r.estado}
</div>

<div class="acciones">

<button onclick="editar(${i})">
✏️
</button>

<button onclick="eliminarRegistro(${i})">
🗑️
</button>

</div>

</div>
`;

});

contenedor.innerHTML = html;

actualizarDashboard();

}

function actualizarDashboard(){

const total =
document.getElementById("totalJerseys");

if(!total){
return;
}

let inversion=0;
let ganancia=0;
let pendiente=0;
let cobrado=0;

let stk=0;
let camino=0;
let entregadas=0;
let pagadas=0;
  
registros.forEach(r=>{

inversion += Number(r.costo);
ganancia += Number(r.ganancia);
pendiente += Number(r.restante);
cobrado += Number(r.abonado);
  
if(r.estado==="STK"){
stk++;
}

if(r.estado==="EN CAMINO"){
camino++;
}

if(r.estado==="ENTREGADA"){
entregadas++;
}

if(r.estado==="PAGADA"){
pagadas++;
}
  
});

document.getElementById("totalJerseys")
.innerText = registros.length;

document.getElementById("inv")
.innerText = "$"+inversion;

document.getElementById("gan")
.innerText = "$"+ganancia;

document.getElementById("pen")
.innerText = "$"+pendiente;

 document.getElementById("cobrado")
.innerText = "$"+cobrado;

document.getElementById("tarjeta")
.innerText = "$"+(cobrado - 9700); 

document.getElementById("stkTotal")
.innerText = stk;

document.getElementById("caminoTotal")
.innerText = camino;

document.getElementById("entregadasTotal")
.innerText = entregadas;

document.getElementById("pagadasTotal")
.innerText = pagadas;

}

function eliminarRegistro(i){

if(!confirm(
"¿Eliminar jersey?"
)){
return;
}

registros.splice(i,1);

guardarDatos();

cargarInventario();

}

function editar(i){

let nuevoAbono =
prompt(
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

cargarInventario();

}

document
.getElementById("buscar")
?.addEventListener(
"keyup",
function(){

let texto =
this.value.toLowerCase();

const tarjetas =
document.querySelectorAll(
".jersey-card"
);

tarjetas.forEach(t=>{

if(
t.innerText
.toLowerCase()
.includes(texto)
){
t.style.display="block";
}else{
t.style.display="none";
}

});

}
);

cargarInventario();
