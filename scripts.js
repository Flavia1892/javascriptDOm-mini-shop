let products = [
  {
    id: 1,
    name: "Product 1",
    price: 10,
    quantity: 2,
    description: "baby kittens of European descent",
    quantitycount: 0,
  },
  {
    id: 2,
    name: "Product 2",
    price: 20,
    quantity: 6,
    description: "Bombay breed of cat-female",
    quantitycount: 0,
  },
  {
    id: 3,
    name: "Product 3",
    price: 30,
    quantity: 5,
    description: "British short-har male breed",
    quantitycount: 0,
  },
  {
    id: 4,
    name: "Product 4",
    price: 30,
    quantity: 4,
    description: "Commom European orange tabby breed; both sexes",
    quantitycount: 0,
  },
  {
    id: 5,
    name: "Product 5",
    price: 30,
    quantity: 3,
    description: "Ragdoll fluffy and mild tempered female breed",
    quantitycount: 0,
  },
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
                         <p class="card-text">Description: ${product.description}</p>                       
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
              ${item.name} - <b style="font-size:27px">$${item.price}  </b>               
             
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center" id='quant'><u> Quantity:</u> <b>${item.quantitycount}</b>
           <button class="btn btn-danger btn-sm remove-from-cart" data-id="${item.id}">Remove</button>
            <button class="btn btn-danger btn-sm clear-cart" data-id="${item.id}">Clear</button></li>
      `
      )
      // iar la final facem join, ca din array (prin cart.map)
      // sa devina un string, stringul fiind cel asteptat in .innerHTML (ceva de genul: "<li>test</li><li>test</li><li>test</li>")
      .join("");

  document.querySelectorAll(".remove-from-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      // ma uit in attribute - acolo am pus id-ul produsului ca informatie
      // si preiau cu getAttribute acea valoare
      const productId = parseInt(event.target.getAttribute("data-id"));

      // o pasez functiei removeFromFromCart ca parametru
      removeFromCart(productId);
    });
  });
  document.querySelectorAll(".clear-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      // ma uit in attribute - acolo am pus id-ul produsului ca informatie
      // si preiau cu getAttribute acea valoare
      const productId = parseInt(event.target.getAttribute("data-id"));

      // o pasez functiei removeFromFromCart ca parametru

      clearProductFromCart(productId);
    });
  });

  const totalValue = document.querySelector("h3");
  totalValue.innerHTML = `<b style="font-size:30px">Cart  Total cost: ${totalvalueOfCart()} $</b>`;

  const totalProducts = document.querySelector("h2");
  totalProducts.innerHTML = `<h2>Products count: ${totalProductsQuantityCart()} </h2>`;

  const butonas = document.getElementById("checkout-btn");
  butonas.innerText = "Checkout";

  const buttonClearCart = document.getElementById("clear-cart");
  buttonClearCart.addEventListener("click", () => {
    products = [
      {
        id: 1,
        name: "Product 1",
        price: 10,
        quantity: 2,
        description: "baby kittens of European descent",
        quantitycount: 0,
      },
      {
        id: 2,
        name: "Product 2",
        price: 20,
        quantity: 6,
        description: "Bombay breed of cat-female",
        quantitycount: 0,
      },
      {
        id: 3,
        name: "Product 3",
        price: 30,
        quantity: 5,
        description: "British short-har male breed",
        quantitycount: 0,
      },
      {
        id: 4,
        name: "Product 4",
        price: 30,
        quantity: 4,
        description: "Commom European orange tabby breed; both sexes",
        quantitycount: 0,
      },
      {
        id: 5,
        name: "Product 5",
        price: 30,
        quantity: 3,
        description: "Ragdoll fluffy and mild tempered female breed",
        quantitycount: 0,
      },
    ];
    renderProducts();
    renderCart();
    const title = document.querySelector("h3");
    title.innerHTML = "<h3>Cart</h3>";
    cart = [];
  });
}

//here we calculate the total vaue of the cart in $
function totalvalueOfCart() {
  let totalSum = 0;
  for (let key in cart)
    totalSum = totalSum + cart[key].price * cart[key].quantitycount;

  return totalSum;
}

//Calculate the quantity of products
function calculateQuantity(productId) {
  const product = products.find((p) => p.id === productId);

  if (product.quantity === 0) {
    const outOfStock = document.querySelectorAll("[id='addToCart']");
    outOfStock[productId - 1].innerHTML = `OutOfStock`;
    return; //if this condition is true then we leave the big function(calculateQuantity) here
  }

  if (checkCart(productId)) cart.push(product);

  product.quantitycount++;

  product.quantity--;

  const cantProdu = document.querySelectorAll("[id='quantity']");
  cantProdu[productId - 1].innerHTML = `Quantity: ${product.quantity}`;
  if (product.quantity <= 0) {
    const outOfStock = document.querySelectorAll("[id='addToCart']");
    outOfStock[productId - 1].innerHTML = `OutOfStock`;
    return;
  }
}
//check to see if the product object already exists in the cart array
function checkCart(productId) {
  for (let key in cart) if (cart[key].id === productId) return false;

  return true;
}
//function to calculate the quantity of products in cart: sum of the quantity value of each product object in cart
function totalProductsQuantityCart() {
  let total = 0;
  for (let key in cart) total = total + cart[key].quantitycount;

  return total;
}
//Add to cart fuction
function addToCart(productId) {
  calculateQuantity(productId);

  renderCart(); //view cart in html

  const totalProducts = document.querySelector("h2");
  totalProducts.innerHTML = `<h2>Products count: ${totalProductsQuantityCart()} </h2>`; //show the toal quantty of products in cart
}

//Here we remove either the object from cart array or we decrease the quantity of the object.id===ProductId from array cart
function removeFromCart(productId) {
  if (products[productId - 1].quantitycount == 1)
    cart = cart.filter((item) => item.id !== productId);

  let prodDecrease = document.querySelectorAll("[id='quant']");
  prodDecrease.innerHTML = `Quantity: ${products[productId - 1]
    .quantitycount--}`;

  products[productId - 1].quantity++;
  const cantProdu = document.querySelectorAll("[id='quantity']");
  cantProdu[productId - 1].innerHTML = `Quantity: ${
    products[productId - 1].quantity
  }`;

  const outOfStock = document.querySelectorAll("[id='addToCart']");
  outOfStock[productId - 1].innerHTML = `Add to Cart`;
  renderCart(productId);
}

//Here we remove an entire object from the cart array if the id of object is clicked
function clearProductFromCart(productId) {
  console.log(cart);
  for (let key in cart) {
    if (cart[key].id === productId) cart.splice(key, 1);
    renderCart();
  }
  //cart = cart.filter((item) => item.id !== productId);
}

function resetCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML =
    // folosind cart object, iterand prin el cu map
    cart
      .map(
        // plus fiecarui element ii spun cum sa arate cu niste HTML si bootstrap classes
        (item) => `
          <li class="list-group-item d-flex justify-content-between align-items-center">
              ${item.name} - $${item.price}                  
              <button class="btn btn-danger btn-sm remove-from-cart" data-id="${item.id}">Remove</button>
              <button class="btn btn-danger btn-sm clear-cart" data-id="${item.id}">Clear</button>
          </li>
               `
      )
      // iar la final facem join, ca din array (prin cart.map)
      // sa devina un string, stringul fiind cel asteptat in .innerHTML (ceva de genul: "<li>test</li><li>test</li><li>test</li>")
      .join("");
}
//here we reset the quantitycount variable in products array for each object(product)
function resetQuant() {
  for (let key in products) products[key].quantitycount = 0;
}
//Here we checkout the cart and reset both cart and products array
function checkout() {
  const totalProducts = document.querySelector("h2");
  totalProducts.innerHTML = `<h2>Products count: ${totalProductsQuantityCart()} </h2>`; //afisare the quantityof the  entire cart in HTML

  if (cart.length === 0) {
    //here we check if the cart is empty and reset the value of procuts array is true
    products = [
      {
        id: 1,
        name: "Product 1",
        price: 10,
        quantity: 2,
        description: "baby kittens of European descent",
        quantitycount: 0,
      },
      {
        id: 2,
        name: "Product 2",
        price: 20,
        quantity: 6,
        description: "Bombay breed of cat-female",
        quantitycount: 0,
      },
      {
        id: 3,
        name: "Product 3",
        price: 30,
        quantity: 5,
        description: "British short-har male breed",
        quantitycount: 0,
      },
      {
        id: 4,
        name: "Product 4",
        price: 30,
        quantity: 4,
        description: "Commom European orange tabby breed; both sexes",
        quantitycount: 0,
      },
      {
        id: 5,
        name: "Product 5",
        price: 30,
        quantity: 3,
        description: "Ragdoll fluffy and mild tempered female breed",
        quantitycount: 0,
      },
    ];
    renderProducts(); //reset products display in html
    const title = document.querySelector("h3");
    title.innerHTML = `<h3>Cart</h3>`; //reset the title of cart
    alert("Cart is empty!");

    // return;
  }

  resetQuant(); //Here we reset the counter in products array for each object

  cart.length = 0; // Clear the cart
  cart = [];

  // si facem reset la cart

  resetCart();
}

document.getElementById("checkout-btn").addEventListener("click", checkout);

renderProducts();
