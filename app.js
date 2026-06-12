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

fecha:new Date().toLocaleDateString(),

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

alert("Jersey guardado correctamente");

}
