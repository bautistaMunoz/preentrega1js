const nombre = prompt("Ingresa tu nombre");
const apellido = prompt("Ingresa tu apellido");

function saludo() {
    alert(`Hola, ${nombre} ${apellido}`)
}
saludo();

const categoria = prompt(`Ingrese la categoria deseada:

Vehiculos
Tecnologia
Moda`).toUpperCase();

const VEHICULOS = [
    { nombre: "Fiat Cronos 1.6", precio: 100000 },
    { nombre: "Peugeot 208 1.6", precio: 170000 },
    { nombre: "Ford Kuga 2.0", precio: 190000 }
];

const TECNOLOGIA = [
    { nombre: "Xiaomi Redmi 10c", precio: 1100 },
    { nombre: "Motorola Moto", precio: 1700 },
    { nombre: "Samsung Galaxy A14", precio: 1900 }
];

const MODA = [
    { nombre: "Campera Parka Hombre", precio: 900 },
    { nombre: "Buzo Lacoste", precio: 1100 },
    { nombre: "Buzo Reef", precio: 1200 },
    { nombre: "Zapatillas Converse", precio: 1160 }
];

function buscarProducto(categoria, nombreDeseado) {
    const nombreDeseadoUpper = nombreDeseado.toUpperCase();
    for (let i = 0; i < categoria.length; i++) {
        if (categoria[i].nombre.toUpperCase() === nombreDeseadoUpper) {
            return categoria[i];
        }
    }
    alert(`No se encontro el producto deseado`)
}
function solicitarProducto(categoria, nombreCategoria) {
    let producto;
    let productoEncontrado = false;
    do {
        const nombreBuscado = prompt(`Indique el ${nombreCategoria} que desea consultar el precio`);
        producto = buscarProducto(categoria, nombreBuscado);
        if (producto) {
            productoEncontrado = true;
        } else {
            alert("Por favor, intenta de nuevo.");
        }
    } while (!productoEncontrado);
    return producto;
}

if (categoria === "VEHICULOS") {
    alert("Bienvenido a la categoría de Vehículos");
    alert(`Los autos disponibles son:

Fiat Cronos 1.6
Peugeot 208 1.6
Ford Kuga 2.0`);
    const vehiculo = solicitarProducto(VEHICULOS, "auto");
    alert(`El precio del ${vehiculo.nombre} es $${vehiculo.precio}`)

} else if (categoria === "TECNOLOGIA") {
    alert("Bienvenido a la categoría de Tecnología");
    alert(`Los articulos tecnologicos disponibles son:
Xiaomi Redmi 10c
Motorola Moto
Samsung Galaxy A14`)
    const articuloTecnologico = solicitarProducto(TECNOLOGIA, "artículo tecnológico");
    alert(`El precio del ${articuloTecnologico.nombre} es $${articuloTecnologico.precio}`)
} else if (categoria === "MODA") {
    alert("Bienvenido a la categoría de Moda");
    alert("Los artículos de moda disponibles son:\n\nCampera Parka Hombre\nBuzo Lacoste\nBuzo Reef\nZapatillas Converse");
    const articuloModa = solicitarProducto(MODA, "artículo de moda");
    alert(`El precio del ${articuloModa.nombre.toUpperCase()} es $${articuloModa.precio}`)
}
let exit = prompt("Gracias por su visita. Para salir ingrese SALIR");
while(exit !== "SALIR"){
    alert(exit);
    exit = prompt("Ingrese SALIR para salir");
    };