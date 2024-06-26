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
    price: 40,
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
    price: 35,
    quantity: 3,
    description: "Ragdoll fluffy and mild tempered female breed",
    quantitycount: 0,
  },
];

let cart = [];
let cartSumForModal = 0;

function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = products
    .map(
      (product) => `
          <div class="col-md-4 mb-4">
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title" style="background-color:wheat">${product.name}</h5>
                      <p style="font-size:13px">Product ID:${product.id}</p>
                      <img height=160px width=130px src="/styles/${product.id}.jpg" alt='poza produs'</img>                       
                        <b><p class="card-text">$${product.price}</p></b> 
                         <p class="card-text" style="font-style: oblique">Description: ${product.description}</p>                       
                      <p class="card-text" id="quantity" style="font-size:19px">Quantity: ${product.quantity}</p>
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
//Render the right floating cart
function renderCart() {
  let rightCart = document.querySelector("#rightCart");
  rightCart.style.display = "block";

  const cartList = document.getElementById("cart-list");

  cartList.innerHTML = cart
    .map(
      (item) => `
          <li class="list-group-item d-flex justify-content-between align-items-center">
              ${item.name} - <b style="font-size:27px">$${item.price}  </b>               
             <li class="list-group-item d-flex justify-content-between align-items-center"><img width=50px, height=50px src="/styles/${item.id}.jpg" alt='poza produs'<img>
             <li class="list-group-item d-flex justify-content-between align-items-center"><b>Product ID: ${item.id}</b></li>
             </li>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center" id='quant'><u> Quantity:</u> <b>${item.quantitycount}</b>
          
      `
    )
    .join("");

  const counterNav = document.getElementById("counter-products"); //here we show the number of items in cart in the navbar
  counterNav.innerText = `${totalProductsQuantityCart()}`;

  const butonViewCart = document.getElementById("go-bottom");
  const ViewCartBottomView = document.getElementById("bottom-view");

  //here we made function to go to checkout area from right floating cart button Checkout

  butonViewCart.addEventListener("click", (event) => {
    event.preventDefault();

    ViewCartBottomView.scrollIntoView({});
  });

  //here we make the function for the navbar button to get us to the cart in Vewcart Bottom Section of the page
  const butonNavBar = document.getElementById("go-to-viewcart");
  const ViewCartView = document.querySelector(".ViewCartSection");

  butonNavBar.addEventListener("click", (evt) => {
    evt.preventDefault();

    ViewCartView.scrollIntoView({ behavior: "smooth" });
  });
}

//

//Render the Checkout Cart

function renderCheckoutCart() {
  const cartList2 = document.getElementById("cart-list2");

  cartList2.innerHTML = cart
    .map(
      (item) => `
 <li class="list-group-item d-flex justify-content-between align-items-center">
             ${item.name} - <b style="font-size:27px">$${item.price}  </b>               
            
         </li>
         <li class="list-group-item d-flex justify-content-between align-items-center"><b>Product ID: ${item.id}</b></li>
         <li class="list-group-item d-flex justify-content-between align-items-center" id='quant'><u> Quantity:</u> <b>${item.quantitycount}</b>
          <button class="btn btn-primary add-to-cart-cart" id="addToCart"data-id="${item.id}">Add</button>
           <button class="btn btn-danger btn-sm remove-from-cart" data-id="${item.id}">Remove</button>
            <button class="btn btn-danger btn-sm clear-cart" data-id="${item.id}">Clear</button></li>

         
     `
    )
    .join("");

  document.querySelectorAll(".remove-from-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = parseInt(event.target.getAttribute("data-id"));

      removeFromCart(productId);
    });
  });
  document.querySelectorAll(".clear-cart").forEach((button) => {
    //here we remove an entire row of the Product Id
    button.addEventListener("click", (event) => {
      // ma uit in attribute - acolo am pus id-ul produsului ca informatie
      // si preiau cu getAttribute acea valoare
      const productId = parseInt(event.target.getAttribute("data-id"));

      // o pasez functiei removeFromFromCart ca parametru

      clearProductIdFromCart(productId);
    });
  });

  document
    .querySelectorAll(".add-to-cart-cart")
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
  const totalValue = document.getElementById("total-viewcart"); //here we see the total sum of the cart in the CHECKOUT Cart
  totalValue.innerHTML = `<p style="font-size:30px">ViewCart</p> <b> Total cost: ${totalvalueOfCart()} $</b>`;

  cartSumForModal = totalvalueOfCart(); //here we calculate the sum that will be displayed in the modal

  const totalProducts = document.getElementById("count-viewcart");
  totalProducts.innerHTML = `<h2>Products count: ${totalProductsQuantityCart()} </h2>`;

  const buttonClearCart = document.getElementById("clear-cart2"); //Here we clear the cart entirely

  buttonClearCart.addEventListener("click", function () {
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
        price: 40,
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
        price: 25,
        quantity: 3,
        description: "Ragdoll fluffy and mild tempered female breed",
        quantitycount: 0,
      },
    ];
    renderProducts();
    cart = [];
    renderCart();
    showCheckoutCart();
    renderViewCart();
    const title = document.querySelector("h3");
    title.innerHTML = "<h3>Cart</h3>";

    const counterNav = document.getElementById("counter-products"); //here we show the number of items in cart in the navbar
    counterNav.innerText = `0`;

    let goToTop = document.getElementById("top-view"); //scroll back to top after checout
    goToTop.scrollIntoView();
  });
}

function showCheckoutCart() {
  const cartList2 = document.getElementById("cart-list2");

  cartList2.innerHTML = cart
    .map(
      (item) => `
 <li class="list-group-item d-flex justify-content-between align-items-center">
             ${item.name} - <b style="font-size:27px">$${item.price}  </b>               
            
         </li>
         <li class="list-group-item d-flex justify-content-between align-items-center"><b>Product ID: ${item.id}</b></li>
         <li class="list-group-item d-flex justify-content-between align-items-center" id='quant'><u> Quantity:</u> <b>${item.quantitycount}</b>
          <button class="btn btn-primary add-to-cart-cart" id="addToCart"data-id="${item.id}">Add</button>
           <button class="btn btn-danger btn-sm remove-from-cart" data-id="${item.id}">Remove</button>
            <button class="btn btn-danger btn-sm clear-cart" data-id="${item.id}">Clear</button></li>

         
     `
    )
    .join("");
  const totalValue = document.getElementById("total-viewcart"); //here we see the total sum of the cart in the CHECKOUT Cart
  totalValue.innerHTML = `<p style="font-size:30px">ViewCart</p> <b> Total cost: ${totalvalueOfCart()} $</b>`;

  const totalProducts = document.getElementById("count-viewcart");
  totalProducts.innerHTML = `<h2>Products count: ${totalProductsQuantityCart()} </h2>`;
}

//end of experiemtn

function goToTop() {
  let clearCartBtn = document.querySelector(".butonas");
  let topView = document.getElementById("top-view");

  clearCartBtn.addEventListener("click", (event) => {
    event.preventDefault();
    topView.scrollIntoView();
  });
}

//Here we render the ViewCart cart
function renderViewCart() {
  const cartList3 = document.getElementById("cart-list3");

  cartList3.innerHTML = cart
    .map(
      (item) => `
   <li class="list-group-item d-flex justify-content-between align-items-center">
               ${item.name} - <b style="font-size:27px">$${item.price}  </b>               
              
           </li>
           <li class="list-group-item d-flex justify-content-between align-items-center"><b>Product ID: ${item.id}</b></li>
           <li class="list-group-item d-flex justify-content-between align-items-center" id='quant'><u> Quantity:</u> <b>${item.quantitycount}</b>
           <button class="btn btn-danger btn-sm clear-cart" data-id="${item.id}">Clear</button></li>
       `
    )
    .join("");

  document.querySelectorAll(".clear-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      // ma uit in attribute - acolo am pus id-ul produsului ca informatie
      // si preiau cu getAttribute acea valoare
      const productId = parseInt(event.target.getAttribute("data-id"));

      // o pasez functiei removeFromFromCart ca parametru

      clearProductIdFromCart(productId);
    });
  });

  let goToCheckout = document.getElementById("go-checkout");
  let sectionBottom = document.getElementById("last-section");

  goToCheckout.addEventListener("click", (evt) => {
    evt.preventDefault();
    sectionBottom.scrollIntoView();
  });
  // const totalVal = document.getElementById("total-viewcart");
  //  totalVal.innerHTML = `<p style="font-size:30px">Cart</p> <b> Total cost: ${totalvalueOfCart()} $</b>`;

  const totalValue = document.getElementById("totalsum-viewcart"); //Display total amount of $ in floating right cart
  totalValue.innerHTML = `<p style="font-size:30px">Cart</p> <b> Total cost: ${totalvalueOfCart()} $</b>`;

  const totalProducts = document.querySelector("h2"); //Total number of products in viewcart
  totalProducts.innerHTML = `<h2>Products count: ${totalProductsQuantityCart()} </h2>`;

  const buttonClearCart = document.getElementById("clear-cart");
  buttonClearCart.addEventListener(
    "click",
    () => {
      console.log("Clear the cart!");
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
          price: 40,
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
          price: 25,
          quantity: 3,
          description: "Ragdoll fluffy and mild tempered female breed",
          quantitycount: 0,
        },
      ];
      cart = [];
      renderProducts();
      resetCart();
      showCheckoutCart();
      renderViewCart();
      const title = document.querySelector("h3");
      title.innerHTML = "<h3>Cart</h3>";

      const counterNav = document.getElementById("counter-products"); //here we show the number of items in cart in the navbar
      counterNav.innerText = `0`;
      modal2.style.display = "none";
    },
    goToTop()
  );
  //Modal creation for ViewCart
  let modal2 = document.getElementById("myModal2");

  let btn = document.getElementById("viewcart-open");

  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName("close2")[1];
  let cancelBtn = document.getElementsByClassName("close2")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function () {
    modal2.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal2.style.display = "none";
  };
  cancelBtn.onclick = function () {
    modal2.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal2) {
      modal2.style.display = "none";
    }
  };
  //End of modal caaling function
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

  const cantProdu = document.querySelectorAll("[id='quantity']"); //Update la cantitatea de produs din products
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
  renderCheckoutCart();
  renderViewCart();

  const totalProducts = document.querySelector("h2");
  totalProducts.innerHTML = `<h2>Products count: ${totalProductsQuantityCart()} </h2>`; //show the toal quantty of products in cart
}

//Here we remove either the object from cart array or we decrease the quantity of the object.id===ProductId from array cart
function removeFromCart(productId) {
  if (products[productId - 1].quantitycount === 1)
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
  renderCheckoutCart(productId);
  renderViewCart(productId);
}

//Here we remove an entire object from the cart array if the id of object is clicked
function clearProductIdFromCart(productId) {
  for (let key in cart) {
    if (cart[key].id === productId) {
      products[cart[key].id - 1].quantity += cart[key].quantitycount;
      cart[key].quantitycount = 0;
      cart.splice(key, 1);
    }
    renderProducts();
    renderCart();
    showCheckoutCart();
    renderViewCart();

    if (cart.length === 0) {
      let goToTop = document.getElementById("top-view"); //scroll back to top after checout
      goToTop.scrollIntoView();
    }
  }
}

function resetCart() {
  document.querySelector("#rightCart").style.display = "none";
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML =
    // folosind cart object, iterand prin el cu map
    cart
      .map(
        // plus fiecarui element ii spun cum sa arate cu niste HTML si bootstrap classes
        (item) => `
          <li class="list-group-item d-flex justify-content-between align-items-center">
              ${item.name} - $${item.price} 
               <li class="list-group-item d-flex justify-content-between align-items-center"><img width=50px, height=50px src="/styles/${item.id}.jpg" alt='poza produs'<img>
             <li class="list-group-item d-flex justify-content-between align-items-center"><b>Product ID: ${item.id}</b></li>
             </li>
          </li>                 
              <button class="btn btn-danger btn-sm remove-from-cart" data-id="${item.id}">Remove</button>
              <button class="btn btn-danger btn-sm clear-cart" data-id="${item.id}">Clear</button>
          </li>
               `
      )
      // iar la final facem join, ca din array (prin cart.map)
      // sa devina un string, stringul fiind cel asteptat in .innerHTML (ceva de genul: "<li>test</li><li>test</li><li>test</li>")
      .join("");
}

function resetCheckoutCart() {
  const cartList2 = document.getElementById("cart-list2");

  cartList2.innerHTML = cart
    .map(
      (item) => `
 <li class="list-group-item d-flex justify-content-between align-items-center">
             ${item.name} - <b style="font-size:27px">$${item.price}  </b>               
            
         </li>
         <li class="list-group-item d-flex justify-content-between align-items-center"><b>Product ID: ${item.id}</b></li>
         <li class="list-group-item d-flex justify-content-between align-items-center" id='quant'><u> Quantity:</u> <b>${item.quantitycount}</b>
          <button class="btn btn-danger btn-sm remove-from-cart" data-id="${item.id}">Remove</button>
           <button class="btn btn-danger btn-sm clear-cart" data-id="${item.id}">Clear</button></li>
     `
    )
    .join("");
}
//here we reset the quantitycount variable in products array for each object(product)
function resetQuant() {
  for (let key in products) products[key].quantitycount = 0;
}

//Here is the function to call when we want to display the Modal at yhe Checkout
function getModal() {
  //Modal creation
  let modal = document.getElementById("myModal");

  let productsPurchased = document.getElementById("productsShow");
  productsPurchased.innerHTML = ``;

  modal.style.display = "block";

  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName("close")[1];
  let cancelBtn = document.getElementById("cancel");

  //  When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    document.querySelector(".succes").innerHTML = "";
    document.querySelector(".checkoutdisplay").innerHTML = "";

    modal.style.display = "none";
  };

  cancelBtn.addEventListener("click", function () {
    document.querySelector(".succes").innerHTML = "";
    document.querySelector(".checkoutdisplay").innerHTML = "";

    modal.style.display = "none";
  });

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";

      let productsPurchased = document.getElementById("productsShow");
      productsPurchased.innerHTML = ``;
    }
  };
} //End of modal caling function

//Here we checkout the cart and reset both cart and products array
function resetAll() {
  const totalProducts = document.querySelectorAll("h2");
  totalProducts.innerHTML = `<h2>Products count: ${totalProductsQuantityCart()} </h2>`;

  //afisare the quantityof the  entire cart in HTML

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
      price: 40,
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
      price: 25,
      quantity: 3,
      description: "Ragdoll fluffy and mild tempered female breed",
      quantitycount: 0,
    },
  ];
  renderProducts(); //reset products display in html
  const title = document.querySelector("h3");
  title.innerHTML = `<h3>Cart</h3>`;
  const productsNumber1 = document.querySelector("h2");
  productsNumber1.innerText = "Products count";

  const title2 = document.getElementById("total-viewcart");
  title2.innerHTML = `<h3>Cart</h3>`;
  const productsNumber2 = document.getElementById("count-viewcart");
  productsNumber2.innerHTML = "Products count";

  resetQuant(); //Here we reset the counter in products array for each object

  cart.length = 0; // Clear the cart

  // si facem reset la cart

  resetCart();
  resetCheckoutCart();
  renderViewCart();

  const counterNav = document.getElementById("counter-products"); //here we show the number of items in cart in the navbar
  counterNav.innerText = `${totalProductsQuantityCart()}`;
}
function getValue() {
  let inputField = document.getElementById("myInput");

  let value = inputField.value;
  let sum = 0;
  if (value === "cats10") {
    discountCounter = 1;
    sum = totalvalueOfCart() * 0.9;
    const totalValue1 = document.getElementById("total-viewcart"); //here we see the total sum of the cart in the CHECKOUT Cart
    totalValue1.innerHTML = `<p style="font-size:30px">ViewCart</p> <b> Total cost: ${sum} $</b>`;

    const totalValue = document.getElementById("totalsum-viewcart"); //Display total amount of $ in floating right cart
    totalValue.innerHTML = `<p style="font-size:30px">Cart</p> <b> Total cost: ${sum} $</b>`;

    cartSumForModal = sum;

    inputField.value = "";
    getModalForCoupon();
  } else {
    inputField.value = "";
    alert("The code you have entered is not valid;please insert a valid code");
  }
}
function getValueByEnter() {
  let value = "";

  document.getElementById("myInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      value = this.value;

      let sum = 0;
      if (value === "cats10") {
        discountCounter = 1;
        sum = totalvalueOfCart() * 0.9;
        const totalValue1 = document.getElementById("total-viewcart"); //here we see the total sum of the cart in the CHECKOUT Cart
        totalValue1.innerHTML = `<p style="font-size:30px">ViewCart</p> <b> Total cost: ${sum} $</b>`;

        const totalValue = document.getElementById("totalsum-viewcart"); //Display total amount of $ in floating right cart
        totalValue.innerHTML = `<p style="font-size:30px">Cart</p> <b> Total cost: ${sum} $</b>`;

        cartSumForModal = sum;

        this.value = "";
        getModalForCoupon();
      } else {
        this.value = "";
        alert(
          "The code you have entered is not valid;please insert a valid code"
        );
      }
    }
  });
}

function checkout() {
  if (cart.length > 0) {
    getModal();

    let butonInModal1 = document.getElementById("last-checkout"); //get the checkout button of the modal
    butonInModal1.style.display = "block"; //display the button in the modal
    document.getElementById("cancel").style.display = "block"; //get the cancel button of the modal

    //Function on the click checkout modal button
    butonInModal1.addEventListener("click", () => {
      let scris = document.getElementById("success-message");
      scris.style.alignItems = "center";
      scris.style.fontSize = "40px";
      scris.innerHTML = `Order has been placed!<br>
    Purchase successful`;
      let scris2 = document.getElementById("checkout-display");
      scris2.innerHTML = `Total cost= ${cartSumForModal} $`;

      //Here we display in modal of the Checkout Cart the products that were purchased

      for (let key in cart) {
        let node = document.createElement("li");
        let textnode = document.createTextNode(
          `${cart[key].name}----------ProdID:${cart[key].id}------Quant: ${cart[key].quantitycount}|`
        );

        node.appendChild(textnode);
        document.getElementById("productsShow").appendChild(node);
      }

      resetAll();

      document.getElementById("cancel").style.display = "none";
      butonInModal1.style.display = "none";

      let goToTop = document.getElementById("top-view"); //scroll back to top after checout
      goToTop.scrollIntoView();
    });
  } else alert("Your cart is empty!");
}
function getModalForCoupon() {
  let modalForCoupon = document.querySelector(".modalCoupon");

  modalForCoupon.style.display = "block";

  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modalForCoupon.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modalForCoupon) {
      modalForCoupon.style.display = "none";
    }
  };
}

document.getElementById("checkout-btn").addEventListener("click", checkout);
document.querySelector("#rightCart").style.display = "none";

renderProducts();

let modal2 = document.getElementById("myModal2");
modal2.style.display = "none";

getValueByEnter();
