const principal = document.getElementById("principal");
let categoriaActual;
let carrito = [];

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const mostrarFormularioNombre = () => {
    const inputNombre = document.createElement("input");
    inputNombre.type = "text";
    inputNombre.id = "nombre";
    inputNombre.placeholder = "Ingresa tu nombre";

    const botonNombre = document.createElement("button");
    botonNombre.textContent = "Confirmar nombre";

    principal.appendChild(inputNombre);
    principal.appendChild(botonNombre);

    botonNombre.addEventListener("click", () => {
        const nombre = inputNombre.value;
        if (nombre === "") {
            alert("Por favor, ingresa tu nombre.");
        } else {
            Swal.fire(`Hola, ${nombre}`);
            principal.innerHTML = '';
            mostrarFormularioCategoria();
        }
    });
};

const mostrarFormularioCategoria = () => {
    const selectCategoria = document.createElement("select");
    ["VEHICULOS", "TECNOLOGIA", "MODA"].forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria;
        option.textContent = categoria;
        selectCategoria.appendChild(option);
    });

    const botonSeleccionarCategoria = document.createElement("button");
    botonSeleccionarCategoria.textContent = "Seleccionar Categoria";
    const botonSalir = document.createElement("button");
    botonSalir.textContent = "Salir";

    principal.appendChild(selectCategoria);
    principal.appendChild(botonSeleccionarCategoria);
    principal.appendChild(botonSalir);

    botonSeleccionarCategoria.addEventListener("click", () => {
        const categoria = selectCategoria.value;
        switch (categoria) {
            case "VEHICULOS":
                categoriaActual = VEHICULOS;
                break;
            case "TECNOLOGIA":
                categoriaActual = TECNOLOGIA;
                break;
            case "MODA":
                categoriaActual = MODA;
                break;
            default:
                alert("Categoria no valida");
                return;
        }

        let mensaje = `Productos en la categoria ${categoria}:\n`;
        categoriaActual.forEach(producto => {
            mensaje += `${producto.nombre}: $${producto.precio}\n`;
        });
        alert(mensaje);

        principal.innerHTML = "";
        mostrarFormularioProducto(categoria);
    });

    botonSalir.addEventListener("click", () => {
        if (confirm("Estas seguro de salir?")) {
            principal.innerHTML = "";
            alert("Gracias por visitarnos");
        }
    });
};

const mostrarFormularioProducto = (categoria) => {
    const inputProducto = document.createElement("input");
    inputProducto.type = "text";
    inputProducto.id = "producto";
    inputProducto.placeholder = "Producto a añadir al carrito";

    const botonBuscarProducto = document.createElement("button");
    botonBuscarProducto.textContent = "Seleccionar Producto";
    const botonSalir = document.createElement("button");
    botonSalir.textContent = "Salir";
    const botonVerCarrito = document.createElement("button");
    botonVerCarrito.textContent = "Ver Carrito";
    
    const botonLimpiarCarrito = document.createElement("button");
    botonLimpiarCarrito.textContent = "Limpiar Carrito";

    const parrafoResultado = document.createElement("p");
    parrafoResultado.id = "resultado-producto";

    principal.appendChild(inputProducto);
    principal.appendChild(botonBuscarProducto);
    principal.appendChild(botonSalir);
    principal.appendChild(botonVerCarrito);
    principal.appendChild(botonLimpiarCarrito);
    principal.appendChild(parrafoResultado);

    botonBuscarProducto.addEventListener("click", () => {
        const nombreBuscado = inputProducto.value;
        if (nombreBuscado === '') {
            alert("Por favor, ingresa un nombre de producto");
            return;
        }
        const producto = buscarProducto(categoriaActual, nombreBuscado);
        if (producto) {
            parrafoResultado.textContent = `Espero que disfrutes tu nuevo/a ${producto.nombre}`;
            agregarAlCarrito(producto);
        } else {
            alert("No se encontro el producto. Por favor intenta nuevamente");
            parrafoResultado.textContent = "No se encontro el producto";
        }
    });

    botonSalir.addEventListener("click", () => {
        if (confirm("Estas seguro de salir?")) {
            principal.innerHTML = "";
            alert("Gracias por su visita");
        }
    });

    botonVerCarrito.addEventListener("click", () => {
        mostrarCarrito();
    });

    botonLimpiarCarrito.addEventListener("click", () => {
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        Swal.fire({
            title: "Carrito Limpiado",
            text: "Tu carrito esta vacio",
            icon: "success"
        });
    });
};

const buscarProducto = (categoria, nombreDeseado) => {
    const nombreDeseadoUpper = nombreDeseado.toUpperCase();
    let productoEncontrado;
    categoria.forEach(producto => {
        if (producto.nombre.toUpperCase() === nombreDeseadoUpper) {
            productoEncontrado = producto;
        }
    });
    return productoEncontrado;
};

const agregarAlCarrito = (producto) => {
    if (carrito.some(el => el.id === producto.id)) {
        const indexProducto = carrito.findIndex(el => el.id === producto.id);
        carrito[indexProducto].cantidad += 1;
    } else {
        const nuevoProducto = {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1,
        };
        carrito.push(nuevoProducto);
    }
    
    localStorage.setItem("carrito", JSON.stringify(carrito)); 
    Swal.fire({
        title: "Bien hecho!",
        text: "Tu producto ha sido añadido al carrito",
        icon: "success"
    });
};

const mostrarCarrito = () => {
    let mensajeCarrito = "Carrito de Compras:\n";
    
    if (carrito.length === 0) {
        mensajeCarrito = "El carrito esta vacio";
    } else {
        carrito.forEach(producto => {
            mensajeCarrito += `${producto.nombre}: $${producto.precio} (Cantidad: ${producto.cantidad})\n`;
        });
    }
    
    alert(mensajeCarrito);
};

mostrarFormularioNombre();

const VEHICULOS = [
    { id: 1, nombre: "Fiat Cronos 1.6", precio: 100000 },
    { id: 2, nombre: "Peugeot 208 1.6", precio: 170000 },
    { id: 3, nombre: "Ford Kuga 2.0", precio: 190000 }
];

const TECNOLOGIA = [
    { id: 4, nombre: "Xiaomi Redmi 10c", precio: 1100 },
    { id: 5, nombre: "Motorola Moto", precio: 1700 },
    { id: 6, nombre: "Samsung Galaxy A14", precio: 1900 }
];

const MODA = [
    { id: 7, nombre: "Campera Parka Hombre", precio: 900 },
    { id: 8, nombre: "Buzo Lacoste", precio: 1100 },
    { id: 9, nombre: "Buzo Reef", precio: 1200 },
    { id: 10, nombre: "Zapatillas Converse", precio: 1160 }
];
