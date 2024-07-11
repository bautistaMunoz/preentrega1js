const nombre = prompt("Ingresa tu nombre");
const apellido = prompt("Ingresa tu apellido");
function saludo(){
    alert("hola,"+nombre+" "+apellido)
}
saludo()
const categoria = prompt("Ingrese la categoria deseada:\n\nVehiculos\nTecnologia\nModa").toUpperCase();
if(categoria === "VEHICULOS"){
    alert("Bienvenido a la categoria de Vehiculos")
    const autos = prompt("Los autos disponibles son:\n\nFiat Cronos 1.3 Gse Drive Cvt\n\nPeugeot 208 1.6 Feline Pack\nFord Kuga 2.0 Sel\n\n Indique de que auto desea consultar el precio").toUpperCase();
}else if(categoria === "TECNOLOGIA"){
    alert("Bienvenido a la categoria de Tecnologia")
    const tecnologia = prompt("Los articulos tecnologicos disponibles son:\n\nXiaomi Redmi 10c Dual Sim 128gb 4gb Ram Ocean Blue\n\nMotorola Moto G23 128 GB Azul cielo 4 GB RAM\n\nSamsung Galaxy A14 (MediaTek) 5G Dual SIM 128 GB light green 4 GB RAM\n\n Indique de que articulo tecnologico desea consultar el precio")
}else if(categoria === "MODA"){
    alert("Bienvenido a la categoria de Moda")
    const moda = prompt("Los articulos de moda disponibles son:\n\nCampera Parka Hombre Negra Impermeable\n\nBuzo De Hombre Lacoste Sh9792\n\nBuzo Reef Vince Hoodie - Hombre Adulto\n\nZapatillas Converse Chuck Taylor Lona High All Star Blanca\n\n Indique de que articulo de moda desea consultar el precio")
}else{
    alert("No ingresaste una categoria correctamente")
}
let exit = prompt("Gracias por su visita. Para salir ingrese SALIR");

while(exit !== "SALIR"){
    alert(exit);
    exit = prompt("Ingrese SALIR para salir");
};
