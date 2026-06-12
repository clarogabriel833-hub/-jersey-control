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

if(!contenedor) return;

let html = "";

registros.forEach((r,i)=>{

let claseEstado = "stk";

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
✏️ Editar
</button>

<button onclick="eliminarRegistro(${i})">
🗑️ Eliminar
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
document.getElementById(
"totalJerseys"
);

const inv =
document.getElementById("inv");

const gan =
document.getElementById("gan");

const pen =
document.getElementById("pen");

if(!total) return;

let inversion=0;
let ganancia=0;
let pendiente=0;

registros.forEach(r=>{

inversion += Number(r.costo);
ganancia += Number(r.ganancia);
pendiente += Number(r.restante);

});

total.innerText =
registros.length;

inv.innerText =
"$"+inversion;

gan.innerText =
"$"+ganancia;

pen.innerText =
"$"+pendiente;

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

let nuevoAbono = prompt(
"Nuevo abono:",
0
);

if(
nuevoAbono===null
){
return;
}

registros[i].abonado +=
Number(nuevoAbono);

registros[i].restante =
registros[i].venta -
registros[i].abonado;

if(
registros[i].restante <= 0
){
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
