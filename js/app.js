const carrito = [];
let cart = [];

let contenedor = document.createElement("div");
updateCoffeeData();

let cartItems = document.getElementById('cart-items');
let cartTotal = document.getElementById('cart-total');

contenedor.addEventListener('click' , function(e) {
  if(e.target && e.target.classList.contains('add-to-cart')){
    const name = e.target.getAttribute('data-name');
    const price = parseFloat(e.target.getAttribute('data-price'));
    addToCart(name, price);
  }
});

document.getElementById("borrarCarrito").addEventListener('click', deleteCart);

document.body.append(contenedor)

document.addEventListener('input', (e) => {
  if (e.target.matches("#searchInput")) {
    const searchTerm = e.target.value.toLowerCase();
    const articulos = document.querySelectorAll(".box-container");
    articulos.forEach((articulo) => {
      const contenido = articulo.textContent.toLowerCase();
      if (contenido.includes(searchTerm)) {
        articulo.style.display = "block";
      } else {
        articulo.style.display = "none";
      }
    });
  }
});

/**********  Consumir API  ************/

function updateCoffeeData() {
  fetch('https://api.sampleapis.com/coffee/hot')
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < 9; i++) {
      let id = data[i].id;
      let title = data[i].title;
      let description = data[i].description;
      let thumbnail = data[i].image;
      let price = 1000*(i+1);
      contenedor.innerHTML += `
        <article id=${id} class="box-container">
            <img class="imagen-producto" src=${thumbnail} alt="imagen sobre ${title}">
            <div class="box-container-body">
              <h2 class="titulo-producto">${title}</h2>
              <p class="desc-producto">${description}</p>
              <b>${price}</b>
              <button id="agregar-${id}" class="add-to-cart" data-name=${title} data-price=${price} > Agregar al Carrito </button>
            </div>
        </article>
      `;  
    }
  })
  .catch(err => console.log(err))
}

/********  Definicion de funciones  *********/

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

function deleteCart() {
  if (cart.length>0) {
    localStorage.removeItem('cart');
    cart = []; 
    updateCart(); 
  }
}

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  
  const carritoLocalStorage =  JSON.parse(localStorage.getItem('cart'));
  
  if (carritoLocalStorage){
    carritoLocalStorage.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - $${item.price.toFixed(2)} `;
      cartItems.appendChild(li);
      total += item.price;
    });
  } 

  cartTotal.textContent = `$${total.toFixed(2)}`;
  
}