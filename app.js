let registros =
JSON.parse(localStorage.getItem("registros")) || [];

let capital =
Number(localStorage.getItem("capital")) || 9000;

let retirado =
Number(localStorage.getItem("retirado")) || 9700;

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
registro.venta - registro.abonado;

registro.ganancia =
registro.venta - registro.costo;

if(registro.restante <= 0){
registro.restante = 0;
registro.estado = "PAGADA";
}

registros.push(registro);

guardarDatos();

alert("✅ Jersey guardado");

location.reload();

}

function cargarInventario(){

const contenedor =
document.getElementById(
"contenedorInventario"
);

if(!contenedor){
actualizarDashboard();
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

let inversion=0;
let ganancia=0;
let pendiente=0;
let cobrado=0;

let stk=0;
let camino=0;
let entregadas=0;
let pagadas=0;

registros.forEach(r=>{

inversion += r.costo;
ganancia += r.ganancia;
pendiente += r.restante;
cobrado += r.abonado;

if(r.estado==="STK") stk++;
if(r.estado==="EN CAMINO") camino++;
if(r.estado==="ENTREGADA") entregadas++;
if(r.estado==="PAGADA") pagadas++;

});

document.getElementById("totalJerseys")?.innerText = registros.length;
document.getElementById("inv")?.innerText = "$"+inversion;
document.getElementById("gan")?.innerText = "$"+ganancia;
document.getElementById("pen")?.innerText = "$"+pendiente;
document.getElementById("cobrado")?.innerText = "$"+cobrado;
document.getElementById("capital")?.innerText = "$"+capital;
document.getElementById("retirado")?.innerText = "$"+retirado;
document.getElementById("tarjeta")?.innerText = "$"+(cobrado-retirado);

document.getElementById("stkTotal")?.innerText = stk;
document.getElementById("caminoTotal")?.innerText = camino;
document.getElementById("entregadasTotal")?.innerText = entregadas;
document.getElementById("pagadasTotal")?.innerText = pagadas;

}

function editar(i){

let nuevoAbono =
prompt("Nuevo abono:",0);

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

function eliminarRegistro(i){

if(!confirm("¿Eliminar jersey?")){
return;
}

registros.splice(i,1);

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

document
.querySelectorAll(".jersey-card")
.forEach(t=>{

t.style.display =
t.innerText
.toLowerCase()
.includes(texto)
? "block"
: "none";

});

}
);

cargarInventario();
