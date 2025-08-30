const observers = [];
const HEADER = document.querySelector("header");
const PROD_CONTAINER = document.getElementById("grid-productos");
const BADGE_CHART = document.getElementById("contador-carrito");
const HAND_EVENTS_BUTTON_CARD = {
  onViewDetail: (product) => {viewProductDetail(product)},
  onAddToCart: (product) => {addProductToBag(product)},
};
const PROD_BUG = [];



document.addEventListener("DOMContentLoaded", async () => {
  try {
    const result = await fetch("https://fakestoreapi.com/products");
    const parseProducts = await result.json();
    const topProducts = getTopTenProducts(parseProducts);
    console.log(topProducts);
    // render de productos
    topProducts.forEach((product) => {
      const card = renderingProduct(product, HAND_EVENTS_BUTTON_CARD);
      PROD_CONTAINER.appendChild(card);
    });

    //sucripcion a PROD_BUG para feed de cambios
    subscribeToProdBug((items)=>{ console.log(`🛒 carrito actualizado: ${items.length}`)})
    subscribeToProdBug((items)=> {updateCountItems(items)});

    //agregar evento para effectos de css
    window.addEventListener("scroll", updateHeaderScroll);

  } catch (error) {
    console.log(`Ocurrio un error durante la ejecucion: ${error}`);
  }
});

/** getTopTenProducts
 * funcion para realizar el filtrado de prodcutos obtiene el top 10
 * @param {*} products
 * @returns productos ->  [{...}]
 */
function getTopTenProducts(products) {
  try {
    const topTen = products
      .sort((a, b) => b.rating.rate - a.rating.rate)
      .slice(0, 10);
    return topTen;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}

/** renderingProducts
 * funcion para crear una card con un producto
 * @param {*} product
 * @returns HTMLDivElement
 */
function renderingProduct(product, handlers = {}) {
  const card = document.createElement("div");
  card.className = "card-producto";
  card.dataset.id = product.id;
  card.innerHTML = `
    <div class="contenido-card">
      <img src="${product.image}" alt="${product.title}" />
      <h4>${product.title}</h4>
      <p class="precio">$${product.price.toFixed(2)}</p>
      <p class="rating">⭐ ${product.rating.rate || 0} (${
      product.rating.count || 0
      })</p>
    </div>
    <div class="card-acciones">
        <button class="ver-detalle" data-id="${product.id}">Ver detalle</button>
        <button class="agregar-carrito" data-id="${product.id}">Agregar</button>
    </div>
    `;

  // agregar handlerEnvents
  const btnDetalle = card.querySelector(".ver-detalle");
  const btnAgregar = card.querySelector(".agregar-carrito");

  if (handlers.onViewDetail) {
    btnDetalle.addEventListener("click", () => handlers.onViewDetail(product));
  }

  if (handlers.onAddToCart) {
    btnAgregar.addEventListener("click", () => handlers.onAddToCart(product));
  }

  return card;
}

/** viewProductDetail
 * funcion para ver detalle de productos
 * @param {*} id 
 */
function viewProductDetail(product) {
  window.localtion.href = `producto.html?id=${product.id}`;
}

//FUNCIONES PARA LA GESTION DE COMPRAS

/** addProductToBag
 * funcion para agregar productos a una lista
 * @param {*} id
 */
function addProductToBag(product) {
  const existe = PROD_BUG.find((p) => p.id === product.id);
  if (!existe) {
    PROD_BUG.push(product);
    notify();
    console.log(`✅ Producto ID ${product.id} agregado`);
  } else {
    console.log(`⚠️ Producto ID ${product.id} ya estaba en la lista`);
  }
}

/** removeProduct
 * funcion para quitar productos de una lista
 * @param {*} id
 */
function removeProductFromBag(product) {
  const originaSize = PROD_BUG.length;
  const index = PROD_BUG.findIndex((p) => p.id === product.id);
  if (index !== -1) {
    PROD_BUG.splice(index, 1);
    if(PROD_BUG.length !== originaSize) notify();
    console.log(`❌ Producto ID ${product.id} eliminado`);
  } else {
    console.log(`⚠️ Producto ID ${product.id} no se encontró en la lista`);
  }
}

/** inBag
 * funcion para validar si el producto esta agregado
 * @param {*} id
 * @returns
 */
function inBag(id) {
  return PROD_BUG.some((p) => p.id === id);
}

/** persistBag
 * persistir lista de productos en local storage
 * @param {*} key
 * @param {*} value
 */
function persistBag(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/** loadBag
 * funcion para recuperar lista de productos de local storage
 * @param {*} key
 * @returns
 */
function loadBag(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}


//FUNCIONES PARA IMPLEMENTAR EL PATRON OBSERVER

/** subscribeToProdBug
 * Suscribe una función que se ejecuta cuando cambia la bolsa
 */
function subscribeToProdBug(fn) {
  observers.push(fn);
}

/** notify
 * Notifica a todos los observadores
 */
function notify() {
  observers.forEach((fn) => fn(PROD_BUG)); //todas la funciones suscritas reciben el carrito
}

//rendering del badge de carrito

/** updateCountItems
 * funcion que actualiza el contador de items del badge
 * @param {*} items 
 */
function updateCountItems(items) {
    const totalItems = items.length;
    BADGE_CHART.textContent = totalItems;
}

//reder effects header
function updateHeaderScroll() {
  if (window.scrollY > 10) {
    HEADER.classList.add("scrolled");
  } else {
    HEADER.classList.remove("scrolled");
  }
}