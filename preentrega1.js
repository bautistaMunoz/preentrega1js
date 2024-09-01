const principal = document.getElementById("principal");

let categoriaActual;
let carrito = [];

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

document.getElementById("limpiarCarrito").addEventListener("click", () => {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    Swal.fire({
        title: "Carrito Limpiado",
        text: "Tu carrito esta vacio",
        icon: "success",
        confirmButtonText: "Aceptar"
    });
});

const botonVerCarrito = document.createElement("button");
botonVerCarrito.textContent = "Ver Carrito";
botonVerCarrito.classList.add("btnCarrito"); 

const contenedorCarrito = document.createElement("div");
contenedorCarrito.classList.add("contenedorCarritoFijo"); 
contenedorCarrito.appendChild(botonVerCarrito);
document.body.appendChild(contenedorCarrito); 

botonVerCarrito.addEventListener("click", () => {
    mostrarCarrito();
});

const mostrarCarrito = () => {
    let mensajeCarrito = "Carrito de Compras:\n";
    
    if (carrito.length === 0) {
        mensajeCarrito = "El carrito esta vacio";
    } else {
        carrito.forEach(producto => {
            mensajeCarrito += `${producto.nombre}: $${producto.precio} (Cantidad: ${producto.cantidad})\n`;
        });
    }
    
    Swal.fire(mensajeCarrito);
};
const mostrarFormularioNombre = () => {
    const contenedorNombre = document.createElement("div");
    contenedorNombre.classList.add("formularioNombre");

    const inputNombre = document.createElement("input");
    inputNombre.type = "text";
    inputNombre.id = "nombre";
    inputNombre.placeholder = "Ingresa tu nombre";

    const botonNombre = document.createElement("button");
    botonNombre.textContent = "Confirmar nombre";
    botonNombre.classList.add("btn");

    contenedorNombre.appendChild(inputNombre);
    contenedorNombre.appendChild(botonNombre);
    principal.appendChild(contenedorNombre);

    botonNombre.addEventListener("click", () => {
        const nombre = inputNombre.value;
        if (nombre === "") {
            Swal.fire({
                title: "Error",
                text: "Por favor, ingresa tu nombre",
                icon: "error",
                confirmButtonText: "Aceptar"
            });
        } else {
            Swal.fire({
                title: `Hola, ${nombre}!`,
                text: "Selecciona una categoria para continuar",
                icon: "success",
                confirmButtonText: "Aceptar"
            }).then(() => {
                principal.innerHTML = '';
                mostrarFormularioCategoria();
            });
        }
    });
};

const mostrarFormularioCategoria = () => {
    const contenedorCategoria = document.createElement("div");
    contenedorCategoria.classList.add("formularioCategoria");

    const etiquetaCategoria = document.createElement("label");
    etiquetaCategoria.textContent = "Selecciona una categoria:";
    etiquetaCategoria.htmlFor = "categoria";

    const seleccionarCategoria = document.createElement("select");
    seleccionarCategoria.id = "categoria";
    seleccionarCategoria.classList.add("seleccionarCategoria");

    const categorias = ["VEHICULOS", "TECNOLOGIA", "MODA"];
    categorias.forEach(categoria => {
        const opcion = document.createElement("option");
        opcion.value = categoria;
        opcion.textContent = categoria;
        seleccionarCategoria.appendChild(opcion);
    });

    const botonSeleccionarCategoria = document.createElement("button");
    botonSeleccionarCategoria.textContent = "Mostrar Productos";
    botonSeleccionarCategoria.classList.add("btn");

    contenedorCategoria.appendChild(etiquetaCategoria);
    contenedorCategoria.appendChild(seleccionarCategoria);
    contenedorCategoria.appendChild(botonSeleccionarCategoria);
    principal.appendChild(contenedorCategoria);

    botonSeleccionarCategoria.addEventListener("click", () => {
        const categoriaSeleccionada = seleccionarCategoria.value;
        fetch('Local.json')
            .then(response => response.json())
            .then(productos => {
                switch (categoriaSeleccionada) {
                    case "VEHICULOS":
                        categoriaActual = productos.vehiculos;
                        break;
                    case "TECNOLOGIA":
                        categoriaActual = productos.tecnologia;
                        break;
                    case "MODA":
                        categoriaActual = productos.moda;
                        break;
                    default:
                        Swal.fire({
                            title: "Error",
                            text: "Categoria no valida",
                            icon: "error",
                            confirmButtonText: "Aceptar"
                        });
                        return;
                }
                
                principal.innerHTML = "";
                mostrarProductosEnFormatoTarjeta(categoriaActual);
            });
    });
};

const mostrarProductosEnFormatoTarjeta = (productos) => {
    const mainComprar = document.createElement("main");
    mainComprar.classList.add("mainComprar");
    const seccion = document.createElement("section");
    const contenedorFlex = document.createElement("div");
    contenedorFlex.classList.add("flexContainer"); 

    const botonSalir = document.createElement("button");
    botonSalir.textContent = "Salir";
    botonSalir.classList.add("btn", "btnSalir");

    botonSalir.addEventListener("click", () => {
        Swal.fire({
            title: "¿Quieres salir?",
            text: "Escribe 'salir' para confirmar",
            input: 'text',
            inputPlaceholder: 'Escribe "salir" aqui',
            preConfirm: (valor) => {
                if (valor.toLowerCase() === 'salir') {
                    return true;
                } else {
                    Swal.showValidationMessage('Debes escribir "salir" para confirmar');
                    return false;
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                carrito = [];
                localStorage.setItem("carrito", JSON.stringify(carrito));
                principal.innerHTML = "";
                Swal.fire({
                    title: "Esperamos que vuelvas!",
                    text: "Gracias por visitar nuestra tienda",
                    icon: "success",
                    confirmButtonText: "Aceptar"
                }).then(() => {
                    mostrarFormularioNombre();
                });
            }
        });
    });

    principal.appendChild(botonSalir);

    productos.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("card");

        const img = document.createElement("img");
        img.classList.add("cardImage"); 
        img.src = obtenerImagenPorCategoria(producto.id);
        img.alt = `Imagen de ${producto.nombre}`;

        const contenidoTarjeta = document.createElement("div");
        contenidoTarjeta.classList.add("cardContent");

        const tituloTarjeta = document.createElement("h3");
        tituloTarjeta.classList.add("cardTitle");
        tituloTarjeta.textContent = producto.nombre;

        const precioGaleria = document.createElement("div");
        precioGaleria.classList.add("gallery__price");

        const precioGaleriaAnterior = document.createElement("span");
        precioGaleriaAnterior.classList.add("galleryPrice10"); 
        precioGaleriaAnterior.textContent = `$${(producto.precio * 1.2).toFixed(2)}`;

        const precioGaleriaActual = document.createElement("span");
        precioGaleriaActual.classList.add("galleryPrice75");
        precioGaleriaActual.innerHTML = `<strong>$${producto.precio.toFixed(2)}</strong>`;

        precioGaleria.appendChild(precioGaleriaAnterior);
        precioGaleria.appendChild(precioGaleriaActual);

        const textoTarjeta = document.createElement("p");
        textoTarjeta.classList.add("cardText");
        textoTarjeta.textContent = "Producto de alta calidad disponible ahora";

const botonTarjeta = document.createElement("div");
botonTarjeta.classList.add("botonTarjeta");

const enlaceTarjeta = document.createElement("button");
enlaceTarjeta.classList.add("cardLink");
enlaceTarjeta.textContent = "Comprar";
enlaceTarjeta.addEventListener("click", () => {
    agregarAlCarrito(producto);
    Swal.fire({
        title: 'Producto agregado',
        text: `Agregaste ${producto.nombre} al carrito`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        timer: 4000,
    });
});

botonTarjeta.appendChild(enlaceTarjeta);

        contenidoTarjeta.appendChild(tituloTarjeta);
        contenidoTarjeta.appendChild(precioGaleria);
        contenidoTarjeta.appendChild(textoTarjeta);
        contenidoTarjeta.appendChild(botonTarjeta);

        tarjeta.appendChild(img);
        tarjeta.appendChild(contenidoTarjeta);

        contenedorFlex.appendChild(tarjeta);
    });

    seccion.appendChild(contenedorFlex);

    mainComprar.appendChild(seccion);
    principal.appendChild(mainComprar);
};

const obtenerImagenPorCategoria = (id) => {
    switch (id) {
        case 1:
            return "multimedia/formato-imagen-web.png";
        case 2:
            return "multimedia/formato-imagen-web.png";
        case 3:
            return "multimedia/formato-imagen-web.png";
        case 4:
            return "multimedia/formato-imagen-web.png";
        case 5:
            return "multimedia/formato-imagen-web.png";
        case 6:
            return "multimedia/formato-imagen-web.png";
        case 7:
            return "multimedia/formato-imagen-web.png";
        case 8:
            return "multimedia/formato-imagen-web.png";
        case 9:
            return "multimedia/formato-imagen-web.png";
        case 10:
            return "multimedia/formato-imagen-web.png";
        default:
            return "multimedia/formato-imagen-web.png";
    }
};

const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find(item => item.id === producto.id);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

mostrarFormularioNombre();
