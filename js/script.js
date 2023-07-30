///////////////////////////////////////////////////////////

//!!!!!!!!! Define products !!!!!!!!!//
var productsDom = document.querySelector(".products");
var cartProductsMenu = document.querySelector(".carts-products");
var cartProductsDivDom = document.querySelector(".carts-products div");
var shoppingCartIcon = document.querySelector(".shoppingCart");
var badgeDom = document.querySelector(".badge");
var products = JSON.parse(localStorage.getItem("products"));

//!!!!!!!!! Display Cart Products !!!!!!!!!//

var drawProductsUi = (products) => {
  var productsUi = products.map(
    (item) => `
    <div class="card">
      <img src="${item.image}" alt="">
      <div class="content">
      <!--onclick="saveItemData(${item.id})"-->
        <h3 >${item.title}</h3>
        <p>
          Price: ${item.price} $
        </p>
        <p>
          Category: ${item.category} 
        </p>
      </div>
      <div class="info">
        <button class="add-to-cart" onclick="addedToCart(${item.id})">Add to cart</button>
      </div>
    </div>
  `
  );
  productsDom.innerHTML = productsUi.join("");
};

//!!!!!!!!! Get Products From Api !!!!!!!!!//
var xhr = new XMLHttpRequest();
xhr.open("GET", "products.json", true);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      var productsData = JSON.parse(xhr.responseText);
      localStorage.setItem("products", JSON.stringify(productsData));
      drawProductsUi(productsData);
      console.log(productsData);
    } else {
      console.error("Failed to fetch products data:", xhr.status);
      var storedProducts = JSON.parse(localStorage.getItem("products"));
      if (storedProducts) {
        drawProductsUi(storedProducts);
      }
    }
  }
};
xhr.send();

// Check if there is items in local storage
var addedItem = localStorage.getItem("productsInCart")
  ? JSON.parse(localStorage.getItem("productsInCart"))
  : [];

if (addedItem) {
  addedItem.map((item) => {
    cartProductsDivDom.innerHTML += "<p>" + item.title + item.qty + "</p>";
  });
  badgeDom.style.display = "block";
  badgeDom.innerHTML += addedItem.length;
}

//!!!!!!!!! Add to cart !!!!!!!!!//

var allItems = [];
function addedToCart(id) {
  if (localStorage.getItem("username")) {
    var choosenItem = products.find((item) => item.id === id);
    var item = allItems.find((i) => i.id === choosenItem.id);

    if (item) {
      choosenItem.qty += 1;
    } else {
      allItems.push(choosenItem);
    }

    //TODO: UI
    cartProductsDivDom.innerHTML = "";
    allItems.forEach((item) => {
      cartProductsDivDom.innerHTML += `<p>${item.title} <span class='item-qty'>${item.qty}</span></p>`;
    });
    addedItem = [...addedItem, choosenItem];

    var uniqueProducts = getUniqueArr(addedItem, "id");

    //TODO: Save Data
    localStorage.setItem("productsInCart", JSON.stringify(uniqueProducts));

    //TODO: Add counter of Items
    var cartProductItems = document.querySelectorAll(".carts-products div p");
    badgeDom.style.display = "block";
    badgeDom.innerHTML = cartProductItems.length;
  } else {
    window.location = "login.html";
  }
}

function getUniqueArr(arr, filterType) {
  let unique = arr
    .map((item) => item[filterType])
    .map((item, i, final) => final.indexOf(item) === i && i)
    .filter((item) => arr[item])
    .map((item) => arr[item]);

  return unique;
}

// function saveItemData(id) {
//   localStorage.setItem("productId", id);
//   window.location = "cartDetails.html";
// }

//!!!!!!!!! Open Cart Menu !!!!!!!!!//

function openCartMenu() {
  if (cartProductsDivDom.innerHTML != "") {
    if (cartProductsMenu.style.display == "block") {
      cartProductsMenu.style.display = "none";
    } else {
      cartProductsMenu.style.display = "block";
    }
  }
}

shoppingCartIcon.addEventListener("click", openCartMenu);

// function saveItemData(id) {
//   localStorage.setItem("productId", id);
//   window.location = "cartDetails.html";
// }

//!!!!!!!!! search function !!!!!!!!!//
var input = document.getElementById("search");
input.addEventListener("keyup", function (e) {
  search(e.target.value, JSON.parse(localStorage.getItem("products")));
  if (e.target.value.trim() === "")
    drawProductsUi(JSON.parse(localStorage.getItem("products")));
});
function search(title, myArray) {
  let arr = myArray.filter(
    (item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
  );
  drawProductsUi(arr);
}

//!!!!!!!!! Filter products by category !!!!!!!!!//
var categoryFilter = document.querySelector("#category-filter");
categoryFilter.addEventListener("change", getProductsByCategory);
function getProductsByCategory(e) {
  var cat = e.target.value;
  var products = JSON.parse(localStorage.getItem("products"));
  if (cat === "all") {
    drawProductsUi(products);
  } else {
    products = products.filter((i) => i.category === cat);
    drawProductsUi(products);
  }
}

//!!!!!!!!! Function to filter products based on price range !!!!!!!!!//
function filterProducts() {
  var minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
  var maxPrice =
    parseFloat(document.getElementById("maxPrice").value) || Number.MAX_VALUE;

  var filteredProducts = products.filter((product) => {
    return product.price >= minPrice && product.price <= maxPrice;
  });

  // Call the function to display the filtered products
  drawProductsUi(filteredProducts);
}
