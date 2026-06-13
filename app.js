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
