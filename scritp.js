


let productos = [
    {id: 2, nombre: "Hamburguesa", stock: 23, precio: 10, imgUrl:"./img/hamburguesa.jpg"},  
    {id: 5, nombre: "Pizza", stock: 10, precio: 15, imgUrl:"./img/pizza.png"},
    {id: 8, nombre: "Alitas", stock: 34, precio: 12, imgUrl:"./img/alitas.jpg"},
    {id: 9, nombre: "Salchipapa", stock: 16, precio: 11, imgUrl:"./img/salchipapa.jpg"}
]

let carrito = []
let contenedorCarrito = document.getElementById("contenedorCarrito")
let contenedor = document.getElementById("contenedorProductos")

//`````````````````
renderizarProductos(productos)

let buscador = document.getElementById("buscador")
buscador.addEventListener("input", renderizarProductosFiltrados)

function renderizarProductosFiltrados() {
    let productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()))
    renderizarProductos(productosFiltrados)
}

function renderizarProductos(arrayProductos) {
    contenedor.innerHTML = ""
    for (const producto of arrayProductos) {
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.className = "producto"
        tarjetaProducto.id = producto.id
    
        tarjetaProducto.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>Queda ${producto.stock} </p>
        <p>Cuesta $${producto.precio} </p>
        <img src=${producto.imgUrl}>
        <button class="boton" id= ${producto.id}> Añadir al carrito </button>
        `
    
        contenedor.appendChild(tarjetaProducto)
    }

    let botones = document.getElementsByClassName("boton")
    for (const boton of botones) {
        boton.addEventListener("click", agregarAlCarrito)
    }
}

function agregarAlCarrito(e) {
    let productoBuscado = productos.find(producto => producto.id == e.target.id)
    let posicionDelProductoBuscado = carrito.findIndex(producto => producto.id == productoBuscado.id)

    if (posicionDelProductoBuscado != -1) {
        carrito[posicionDelProductoBuscado].unidades++
        carrito[posicionDelProductoBuscado].subtotal = carrito[posicionDelProductoBuscado].unidades++ * carrito[posicionDelProductoBuscado].precioUnitario
    }else{
        carrito.push({id: productoBuscado.id, nombre:productoBuscado.nombre, precioUnitario: productoBuscado.precio, unidades: 1, subtotal: productoBuscado.precio})
    }

    rederizarCarrito(carrito)
}

function rederizarCarrito(arrayDeProductos) {
    contenedorCarrito.innerHTML = ''
    for (const producto of arrayDeProductos) {
        contenedorCarrito.innerHTML +=`
        <div class="flex">
        <p>${producto.nombre}</p>
        <p>${producto.precioUnitario}</p>
        <p>${producto.unidades}</p>
        <p>${producto.subtotal}</p>
        </div>     
        `
    }

let total = carrito.reduce((acc, ValorActual) => acc + ValorActual.subtotal, 0)
    contenedorCarrito.innerHTML += `
    <h3>TOTAL $${total}</h3>
    
    `
}



