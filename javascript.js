
const productos = [
    { id: 01, nombre: "No oigo a los niños llorar", categoria: "theriller", precio: 3978, stock: 5, img: "./img/no-oigo-a-los-niños-jugar.jpg" },
    { id: 02, nombre: "La chica del tren", categoria: "theriller", precio: 2900, stock: 7, img: "./img/la-chica-del-tren.jpg" },
    { id: 03, nombre: "Bajo el barro", categoria: "theriller", precio: 4695, stock: 10, img: "./img/bajo-el-barro.jpg" },
    { id: 04, nombre: "La guerra de Hart", categoria: "theriller", precio: 4655, stock: 5, img: "./img/la-guerra-de-hart.jpg" },
    { id: 05, nombre: "La pareja de al lado", categoria: "theriller", precio: 3099, stock: 10, img: "./img/la-pareja-de-al-lado.jpg" },
    { id: 06, nombre: "El nido de la araña", categoria: "theriller", precio: 5300, stock: 1, img: "./img/el-nido-de-la-araña.jpg" },
    { id: 07, nombre: "Un pequeño favor", categoria: "theriller", precio: 1240, stock: 9, img: "./img/un-pequeño-favor.jpg" },
    { id: 08, nombre: "El apartamento olvidado", categoria: "theriller", precio: 3500, stock: 15, img: "./img/el-apartamento-olvidado.jpg" },
    { id: 09, nombre: "Donde habita el miedo", categoria: "theriller", precio: 2340, stock: 1, img: "./img/donde-habita-el-miedo.jpg" },

    { id: 09, nombre: "Bajo la misma estrella", categoria: "romance", precio: 2340, stock: 4, img: "./img/bajo-la-misma-estrella.jpg" },
    { id: 10, nombre: "Orgullo y Prejuicio", categoria: "romance", precio: 1340, stock: 16, img: "./img/orgullo-y-prejuicio.jpg" },
    { id: 11, nombre: "Almendra", categoria: "romance", precio: 1440, stock: 14, img: "./img/almendra.jpg" },
    { id: 12, nombre: "Un cuento perfecto", categoria: "romance", precio: 2340, stock: 14, img: "./img/un-cuento-perfecto.jpg" },
    { id: 13, nombre: "Blue Jeans", categoria: "romance", precio: 3540, stock: 8, img: "./img/blue-jeans-promesa-julia-a.jpg" },
    { id: 14, nombre: "Boulevard", categoria: "romance", precio: 1350, stock: 74, img: "./img/boulevard.jpg" },
    { id: 15, nombre: "Nosotros en la luna", categoria: "romance", precio: 2440, stock: 44, img: "./img/nosotros-en-la-luna.jpg" },
    { id: 16, nombre: "Eleanor y Park", categoria: "romance", precio: 1740, stock: 34, img: "./img/Eleanor-y-Park.jpg" },
    { id: 17, nombre: "Finalmente soy yo", categoria: "romance", precio: 1350, stock: 4, img: "./img/finalmente-soy-yo.jpg" },



]

let carritoJSON = ""
let totalFinal = ""
let unidades = ""
let contenedor = document.getElementById("contenedor")
let carritoRender = document.getElementById("cart-row")
let carritoRender2 = document.getElementById("cart-row-2")
let total = document.getElementById("total")
let cartNav = document.getElementById("cart-nav")
let botonCarrito = document.getElementById("cart-button")


renderizar(productos)

let carrito = []
if (localStorage.getItem("Carrito")) {
    carrito = JSON.parse(localStorage.getItem("Carrito"))
    renderizarCarro(carrito)
    totalRender(carrito)
} else {
    totalRenderVacio(carrito)
}
/*                       Buscador       Filtros                        */
let romance = document.getElementById("romance")
let theriller = document.getElementById("theriller")
romance.addEventListener("click", filtroCategoria)
theriller.addEventListener("click", filtroCategoria)

function filtroCategoria(e) {
    e.preventDefault()
    let categoriafiltrado = productos.filter(producto => producto.categoria.toLowerCase() == e.target.id)
    renderizar(categoriafiltrado)
}
let input = document.getElementById("input")
let button = document.getElementById("buscador")
button.addEventListener("click", buscar)
function buscar(e) {
    e.preventDefault()
    let productoFiltrado = productos.filter(producto => producto.nombre.toLowerCase().includes(input.value.toLowerCase()) || producto.categoria.toLowerCase().includes(input.value.toLowerCase()))
    renderizar(productoFiltrado)
}
/*                           Renderizar productos                  */
function renderizar(array) {

    contenedor.innerHTML = ""
    for (const producto of array) {

        let tarjetaBody = document.createElement("div")
        tarjetaBody.className = "col-lg-4"
        tarjetaBody.innerHTML = `
        <div class="div-img" ><img class="thumbnail" src="${producto.img}"></div>
        <div class="box-element product">
            <h6><strong>${producto.nombre}</strong></h6>
            <h6 class= "precio"><strong>Price: $ ${producto.precio.toFixed(2)}</strong></h6><hr>
            <button id ="${producto.id}" class="btn btn-outline-secondary add-btn update-cart">Add to Cart</button>
        </div>
        `
        contenedor.append(tarjetaBody)
    }
    let agregarCarrito = document.getElementsByClassName('btn btn-outline-secondary add-btn update-cart')
    for (boton of agregarCarrito) {
        boton.addEventListener("click", addItem)
    }
}
/*                         Agregar Productos al Carrito                   */
function addItem(e) {

    let productoBuscado = productos.find(producto => producto.id == e.target.id)
    let indexProduct = carrito.findIndex(producto => producto.id == productoBuscado.id)

    if (indexProduct != -1) {
        carrito[indexProduct].unidades++
        carrito[indexProduct].subtotal = carrito[indexProduct].precio * carrito[indexProduct].unidades
        carritoJSON = JSON.stringify(carrito)
        localStorage.setItem("Carrito", carritoJSON)
    }
    else {
        carrito.push({ id: productoBuscado.id, nombre: productoBuscado.nombre, categoria: productoBuscado.categoria, precio: productoBuscado.precio, subtotal: productoBuscado.precio, unidades: 1, img: productoBuscado.img })

        carritoJSON = JSON.stringify(carrito)
        localStorage.setItem("Carrito", carritoJSON)
    }
    totalFinal = carrito.reduce((a, b) => a + b.subtotal, 0)
    unidades = carrito.reduce((a, b) => a + b.unidades, 0)
    renderizarCarro(carrito)
    totalRender(carrito)
}
/*                     Renderizar Carrito                     */
function renderizarCarro(array) {
    carritoRender.innerHTML = ""
    for (let producto of array) {
        let cart = document.createElement("div")
        cart.className = "cart-render"
        cart.innerHTML = `
        <div class="cart-row">
        <div  style="flex:2"><img class="row-image" src="${producto.img}"></div>
        <div  style="flex:2"><p>${producto.nombre}</p></div>
        <div  style="flex:1"><p>$${producto.precio.toFixed(2)}</p></div>
        <div style="flex:1">
        
        <div class="quantity">
        <div class="lala">
        <p class="quantity">${producto.unidades}</p>
        <img id="${producto.id}" class="chg-quantity update-cart " src="images/ap.png">
        <img id="${producto.id}" class="chg-quantity-2 update-cart" src="images/down.png">
        </div>
        </div>
        </div>
        <div style="flex:1"><p>$${producto.subtotal.toFixed(2)}</p></div>
        <div>

        <div class="quantity">
        <img id="${producto.id}" class="chg-quantity-3 update-cart" src="images/trash.png">
        </div>
        </div>
        </div>

        </div>
        </div>
        `
        carritoRender.append(cart)
    }
    let add = document.getElementsByClassName("chg-quantity update-cart")
    for (let a of add) {
        a.addEventListener("click", addItem)
    }
    let remove = document.getElementsByClassName("chg-quantity-2 update-cart")
    for (let b of remove) {
        b.addEventListener("click", removeItem)
    }
    let removee = document.getElementsByClassName("chg-quantity-3 update-cart")
    for (let b of removee) {
        b.addEventListener("click", deleteItem)
    }
}
/*               Eliminar Items del Carrito            */
function deleteItem(e) {
    let productoBuscado = productos.find(producto => producto.id == e.target.id)
    let indexProduct = carrito.findIndex(producto => producto.id == productoBuscado.id)

            carrito[indexProduct].unidades = 0
            carrito[indexProduct].subtotal = carrito[indexProduct].subtotal - carrito[indexProduct].precio
            carritoJSON = JSON.stringify(carrito)
            localStorage.setItem("Carrito", carritoJSON)

            carrito.splice(indexProduct, 1)
            carritoJSON = JSON.stringify(carrito)
            localStorage.setItem("Carrito", carritoJSON)

    totalFinal = carrito.reduce((a, b) => a + b.subtotal, 0)
    unidades = carrito.reduce((a, b) => a + b.unidades, 0)

    renderizarCarro(carrito)
    totalRender(carrito)
}

function removeItem(e) {

    let productoBuscado = productos.find(producto => producto.id == e.target.id)
    let indexProduct = carrito.findIndex(producto => producto.id == productoBuscado.id)
    if (indexProduct != -1) {
        if (carrito[indexProduct].unidades >= 2) {
            carrito[indexProduct].unidades--
            carrito[indexProduct].subtotal = carrito[indexProduct].subtotal - carrito[indexProduct].precio
            carritoJSON = JSON.stringify(carrito)
            localStorage.setItem("Carrito", carritoJSON)
        }
        else {
            carrito.splice(indexProduct, 1)
            carritoJSON = JSON.stringify(carrito)
            localStorage.setItem("Carrito", carritoJSON)
        }
    }
    totalFinal = carrito.reduce((a, b) => a + b.subtotal, 0)
    unidades = carrito.reduce((a, b) => a + b.unidades, 0)

    renderizarCarro(carrito)
    totalRender(carrito)
}
/*                   Renderizar Total de Precio y Unidades del Carrito             */
function totalRender(array) {
    totalFinal = carrito.reduce((a, b) => a + b.subtotal, 0)
    unidades = carrito.reduce((a, b) => a + b.unidades, 0)
    total.innerHTML = ""
    let totalResumen = document.createElement("div")
    totalResumen.className = "total"
    totalResumen.innerHTML = `
    <h5>Items: <strong>${unidades} </strong></h5>
    <h5>Total:<strong> $ ${totalFinal.toFixed(2)}</strong></h5>
    <a id="clear" style="float:right; margin:5px;" type="button" class="btn btn-success" href="index.html">Pagar</a>
    `
    total.append(totalResumen)

    cartNav.innerHTML = ""
    if (array.lenght != 0) {
        let parrafo = document.createElement("div")
        parrafo.className = "cart-total"
        parrafo.innerHTML = `<p>${unidades}</p>`
        cartNav.append(parrafo)
    } else {
        let parrafo = document.createElement("div")
        parrafo.className = "cart-total"
        parrafo.innerHTML = `<p>0</p>`
        cartNav.append(parrafo)
    }
    let clear = document.getElementById("clear")
    clear.addEventListener("click", borrarStorage)
}
function totalRenderVacio(array) {

    total.innerHTML = ""
    let totalResumen = document.createElement("div")
    totalResumen.className = "total"
    totalResumen.innerHTML = `
    <h5>Items: <strong>  0 </strong></h5>
    <h5>Total:<strong> $ 0.00 </strong></h5>
    <a id="clear" style="float:right; margin:5px;" type="button" class="btn btn-success" href="index.html">Pagar</a>
    `
    total.append(totalResumen)

    cartNav.innerHTML = ""
    let parrafo = document.createElement("div")
    parrafo.className = "cart-total"
    parrafo.innerHTML = `<p>0</p>`
    cartNav.append(parrafo)
}
/*       Eliminar Carrito del LocalStorage  */
function borrarStorage() {
    localStorage.removeItem("Carrito")
}

botonCarrito.addEventListener("click", esconder)

function esconder(e) {
    contenedor.innerHTML = ""
    if (carrito.length == 0){
        let boton = document.createElement("div")
    boton.className = "boton-render"
    boton.innerHTML = `
        <a type="button" class="btn btn-success" href="index.html">Ir a la Tienda</a>
        `
    contenedor.append(boton)
    } else{

        let boton = document.createElement("div")
        boton.className = "boton-render"
        boton.innerHTML = `
        <a type="button" class="btn btn-success" href="index.html">Seguir comprando</a>
        `
        contenedor.append(boton)
    }

}