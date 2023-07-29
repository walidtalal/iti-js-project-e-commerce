var productsDom = document.querySelector(".products");
var noProductsDom = document.querySelector(".noProducts");
const pricesDom = document.getElementById("total-price");
var checkoutBtn = document.querySelector(".checkout button");

function drawCartProductsUI(allProducts = []) {
  if (JSON.parse(localStorage.getItem("productsInCart")).length === 0)
    noProductsDom.innerHTML = "There are no items!!";

  var products =
    JSON.parse(localStorage.getItem("productsInCart")) || allProducts;
  var productsUI = products.map((item) => {
    return `
      <div class="card">
        <img src="${item.image}" alt="">
        <div class="content">
          <h3 onclick='saveItemData(${item.id})'>${item.title}</h3>
          <p>Price: ${item.price} $</p>
          <p>Category: ${item.category} $</p>
          <button class="add-button" onclick="add(${item.id})">+</button>
          <span id="quantity"> Quantity: ${item.qty} </span>
          <button class="minus-button" onclick="minus(${
            item.id
          })">-</button> <br>
          <span> subPrice: ${item.qty * item.price} </span> <br>
        </div>
        <div class="info">
          <button class="remove-from-cart" onclick="removeItemFromCart(${
            item.id
          })">Remove From Cart</button>
        </div>
      </div>
    `;
  });

  productsDom.innerHTML = productsUI.join("");

  updatePrices(products);
}

drawCartProductsUI();

// Increase the number of the same product
function add(id) {
  var productsInCart = localStorage.getItem("productsInCart");
  if (productsInCart) {
    var items = JSON.parse(productsInCart);
    var itemToUpdate = items.find((item) => item.id === id);
    if (itemToUpdate) {
      itemToUpdate.qty++;
      itemToUpdate.subPrice = itemToUpdate.qty * itemToUpdate.price; // Update subprice
      localStorage.setItem("productsInCart", JSON.stringify(items));
      drawCartProductsUI(items);

      updatePrices(items);
    }
  }
}

// Decrease the number of the same product
function minus(id) {
  var productsInCart = localStorage.getItem("productsInCart");
  if (productsInCart) {
    var items = JSON.parse(productsInCart);
    var itemToUpdate = items.find((item) => item.id === id);
    if (itemToUpdate && itemToUpdate.qty > 1) {
      itemToUpdate.qty--;
      itemToUpdate.subPrice = itemToUpdate.qty * itemToUpdate.price; // Update subprice
      localStorage.setItem("productsInCart", JSON.stringify(items));
      drawCartProductsUI(items);

      updatePrices(items);
    }
  }
}

// Remove item from the cart
function removeItemFromCart(id) {
  var productsInCart = localStorage.getItem("productsInCart");
  if (productsInCart) {
    var items = JSON.parse(productsInCart);
    var filteredItems = items.filter((item) => item.id !== id);
    localStorage.setItem("productsInCart", JSON.stringify(filteredItems));
    drawCartProductsUI(filteredItems);

    updatePrices(filteredItems);
  }
}

function updatePrices(products) {
  const totalPrice = products.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  pricesDom.innerHTML = `<p>Total Price:</p> <span>$${totalPrice}</span>`;
}

// checkout function
function checkout() {
  alert("Thanks for checking out!");

  localStorage.removeItem("productsInCart");

  setTimeout(function () {
    window.location.href = "index.html";
  }, 2000);
}
checkoutBtn.addEventListener("click", checkout);
