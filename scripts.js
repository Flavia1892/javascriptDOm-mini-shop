let products = [
  { id: 1, name: "Product 1", price: 10, quantity: 2 },
  { id: 2, name: "Product 2", price: 20, quantity: 6 },
  { id: 3, name: "Product 3", price: 30, quantity: 5 },
  { id: 4, name: "Product 4", price: 30, quantity: 4 },
  { id: 5, name: "Product 5", price: 30, quantity: 3 },
];

let cart = [];

function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = products
    .map(
      (product) => `
          <div class="col-md-4 mb-4">
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title">${product.name}</h5>
                      <img height=160px width=130px src="/styles/${product.id}.jpg" alt='poza produs'</img>                       
                        <p class="card-text">$${product.price}</p>                        
                      <p class="card-text" id="quantity">Quantity: ${product.quantity}</p>
                      <button class="btn btn-primary add-to-cart" id="addToCart"data-id="${product.id}">Add to Cart</button>
                  </div>
              </div>
          </div>
      `
    )
    .join("");

  // selectez toate elementele cu clasa "add-to-card"
  document
    .querySelectorAll(".add-to-cart")
    // le parcurg
    .forEach((button) => {
      // fiecarui button ii spun ce sa faca la "click"
      button.addEventListener("click", (event) => {
        // ma uit in attribute - acolo am pus id-ul produsului ca informatie
        // si preiau cu getAttribute acea valoare
        const productId = parseInt(event.target.getAttribute("data-id"));

        // o pasez functiei addToCart ca parametru
        addToCart(productId);
      });
    });
}

function renderCart() {
  // cart-list fiind un element in index.html
  const cartList = document.getElementById("cart-list");

  // ii dictez ce sa contina
  cartList.innerHTML =
    // folosind cart object, iterand prin el cu map
    cart
      .map(
        // plus fiecarui element ii spun cum sa arate cu niste HTML si bootstrap classes
        (item) => `
          <li class="list-group-item d-flex justify-content-between align-items-center">
              ${item.name} - $${item.price}
              <button class="btn btn-danger btn-sm remove-from-cart" data-id="${item.id}">Remove</button>
          </li>
      `
      )
      // iar la final facem join, ca din array (prin cart.map)
      // sa devina un string, stringul fiind cel asteptat in .innerHTML (ceva de genul: "<li>test</li><li>test</li><li>test</li>")
      .join("");

  document.querySelectorAll(".remove-from-cart").forEach((button) => {
    //  TODO: implementeaza ce sa faca remove from cart

    button.addEventListener("click", (event) => {
      // ma uit in attribute - acolo am pus id-ul produsului ca informatie
      // si preiau cu getAttribute acea valoare
      const productId = parseInt(event.target.getAttribute("data-id"));

      // o pasez functiei removeFromFromCart ca parametru
      removeFromCart(productId);
    });
  });
}

//Calculate the quantity of products
function calculateQuantity(productId) {
  const product = products.find((p) => p.id === productId);

  if (product.quantity <= 0) {
    const outOfStock = document.querySelectorAll("[id='addToCart']");
    outOfStock[productId - 1].innerHTML = `OutOfStock`;
    return;
  } else {
    cart.push(product);
  }

  product.quantity--;

  const cantProdu = document.querySelectorAll("[id='quantity']");
  cantProdu[productId - 1].innerHTML = `Quantity: ${product.quantity}`;
  if (product.quantity <= 0) {
    const outOfStock = document.querySelectorAll("[id='addToCart']");
    outOfStock[productId - 1].innerHTML = `OutOfStock`;
    return;
  }
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  calculateQuantity(product.id);

  // TODO: "impinge" produsul in lista de cart
  // asta trebuie sa faci tu :)

  const totalProducts = document.querySelector("h2");
  totalProducts.innerHTML = `<h2>Total produse: ${cart.length}</h2>`;

  renderCart();
}

function removeFromCart(productId) {
  // filtreaza-mi tot ce e diferit ce input "productId"
  // obtin un array fara ce am pasat in input
  cart = cart.filter((item) => item.id !== productId);

  // update la datele afisate
  const totalProducts = document.querySelector("h2");
  totalProducts.innerHTML = `<h2>Total produse: ${cart.length}</h2>`;
  renderCart();
}

function resetQuantity() {
  const cantProdu = document.querySelectorAll("[id='quantity']");
  cantProdu[0].innerHTML = `Quantity: 2`;
  products[0].quantity = 2;
  cantProdu[1].innerHTML = `Quantity: 6`;
  products[1].quantity = 6;
  cantProdu[2].innerHTML = `Quantity: 5`;
  products[2].quantity = 5;
  cantProdu[3].innerHTML = `Quantity: 4`;
  products[3].quantity = 4;
  cantProdu[4].innerHTML = `Quantity: 3`;
  products[4].quantity = 3;

  const outOfStock = document.querySelectorAll("[id='addToCart']");

  for (let i = 0; i < products.length; i++) {
    outOfStock[i].innerHTML = `Add to Cart`;
  }
}
function checkout() {
  let total = 0;

  console.log(cart);

  if (cart.length === 0) {
    {
      document.getElementById("checkout-btn").innerHTML = "Checkout";
      document.querySelector("h2").innerHTML = `Total produse: 0`;

      resetQuantity();
      alert("Cart is empty!");
    }
    return;
  } else total = cart.reduce((total, arr) => total + arr.price, 0);

  // afiseaza mesajul
  const butonel = document.getElementById("checkout-btn");
  butonel.innerHTML = `Your total is: ${total} $`;

  //alert(`Your total is $${total}. Thank you for your purchase!`);

  // acum ca a dat checkout si "a cumparat"
  // golim cartul pentru alte cumparaturi :)
  cart.length = 0; // Clear the cart

  // si facem iar update

  renderCart();
}

document.getElementById("checkout-btn").addEventListener("click", checkout);

renderProducts();
