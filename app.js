let registros =
JSON.parse(localStorage.getItem("registros")) || [];

function guardarDatos(){
localStorage.setItem(
"registros",
JSON.stringify(registros)
);
}

function agregarRegistro(){

const playera =
document.getElementById("playera").value;

const talla =
document.getElementById("talla").value;

const cliente =
document.getElementById("cliente").value;

const costo =
Number(document.getElementById("costo").value);

const venta =
Number(document.getElementById("venta").value);

const abonado =
Number(document.getElementById("abonado").value || 0);

const estado =
document.getElementById("estado").value;

const registro = {
playera,
talla,
cliente,
costo,
venta,
abonado,
estado,
restante: venta - abonado
};

registros.push(registro);

guardarDatos();

alert("✅ Jersey guardado");

}

function cargarInventario(){

const contenedor =
document.getElementById(
"contenedorInventario"
);

if(!contenedor){
return;
}

let html = "";

registros.forEach(r=>{

html += `
<div class="jersey-card">
<h3>${r.playera}</h3>
<p>Cliente: ${r.cliente}</p>
<p>Talla: ${r.talla}</p>
<p>Venta: $${r.venta}</p>
<p>Abonado: $${r.abonado}</p>
<p>Estado: ${r.estado}</p>
</div>
`;

});

contenedor.innerHTML = html;

}

cargarInventario();
function actualizarDashboard(){

let registros =
JSON.parse(localStorage.getItem("registros")) || [];

let inversion=0;
let cobrado=0;
let pendiente=0;
let ganancia=0;

let stk=0;
let camino=0;
let entregadas=0;
let pagadas=0;

registros.forEach(r=>{

inversion += Number(r.costo || 0);
cobrado += Number(r.abonado || 0);
pendiente += Number(r.restante || 0);

ganancia +=
Number(r.venta || 0) -
Number(r.costo || 0);

if(r.estado==="STK") stk++;
if(r.estado==="EN CAMINO") camino++;
if(r.estado==="ENTREGADA") entregadas++;
if(r.estado==="PAGADA") pagadas++;

});

document.getElementById("totalJerseys")?.innerText =
registros.length;

document.getElementById("inv")?.innerText =
"$"+inversion;

document.getElementById("cobrado")?.innerText =
"$"+cobrado;

document.getElementById("pen")?.innerText =
"$"+pendiente;

document.getElementById("gan")?.innerText =
"$"+ganancia;

document.getElementById("stkTotal")?.innerText =
stk;

document.getElementById("caminoTotal")?.innerText =
camino;

document.getElementById("entregadasTotal")?.innerText =
entregadas;

document.getElementById("pagadasTotal")?.innerText =
pagadas;

}

actualizarDashboard();
