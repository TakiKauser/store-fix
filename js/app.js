const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image; // image fixed
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <div class="single-product bg-success">
        <div class="card">
          <img class="product-image" src=${image}></img>
          <div class="card-body">
            <h3 class="card-title">${product.title}</h3>
            <p class="card-text">Category: ${product.category}</p>
            <h2 class="card-text">Price: $ ${product.price}</h2>
            <h5 class="card-text">Average Rating:  ${product.rating.rate}</h5>
            <h5 class="card-text">Number of Rating:  ${product.rating.count}</h5>
          </div>
          <div class="card-footer">
            <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">Add to Cart</button>
            <button id="details-btn" class="btn btn-warning">Details</button>
          </div>
        </div>
      </div>
    `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal(); // total price updated fix
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  const decimalTotal = parseFloat(total.toFixed(2));
  // console.log(id, value, total, decimalTotal);
  document.getElementById(id).innerText = decimalTotal;
};

// set innerText function
const setInnerText = (id, value) => {
  decimalValue = parseFloat(value.toFixed(2));
  document.getElementById(id).innerText = decimalValue;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal.toFixed(2));
};
