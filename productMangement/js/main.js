let title = document.getElementById("title");
let priceInfo = document.querySelectorAll(".price-info input");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let add = document.getElementById("add");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search = document.getElementById("search");
let byTitle = document.getElementById("byTitle");
let byCategory = document.getElementById("byCategory");
let tbody = document.getElementById("tbody");
//////////////////////////////////////////////////////////////////////////

let productData;
let mode = "create";
let temp;
if (localStorage.product != null) {
  productData = JSON.parse(localStorage.product);
  showProduct();
} else {
  productData = [];
}

//create product /////////////////////////////////////////////////////////////////
function createNew() {
  if (title.value != "" && price.value != "" && category.value != "") {
    let newProduct = {
      title: title.value.toLowerCase(),
      price: price.value,
      tax: tax.value,
      add: add.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value.toLowerCase(),
    };
    if (mode == "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          productData.push(newProduct);
        }
      } else {
        productData.push(newProduct);
      }
    } else {
      productData[temp] = newProduct;

      count.style = "display:block;";
      create.innerHTML = "create";
      tbody.style = "pointer-events: all;";
    }

    localStorage.setItem("product", JSON.stringify(productData));
    clearInputs();
    showProduct();
    title.focus();
  } else {
    alert("title , price , category  should not be null");
  }
  title.focus();
}

//get total ///////////////////////////////////////////////////////////////////////
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +tax.value + +add.value - +discount.value;
    total.innerHTML = result;
    total.classList.add("total-price");
  } else {
    total.innerHTML = "";
    total.classList.remove("total-price");
  }
}
//clear inputs //////////////////////////////////////////////////////////////////////
function clearInputs() {
  title.value = "";
  price.value = "";
  tax.value = "";
  add.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//read //////////////////////////////////////////////////////////////////////////////
function showProduct() {
  getTotal();
  let table = "";
  for (let i = 0; i < productData.length; i++) {
    table += `
  <tr>
              <th>${i + 1}</th>
              <th>${productData[i].title}</th>
              <th>${productData[i].price}</th>
              <th>${productData[i].tax}</th>
              <th>${productData[i].add}</th>
              <th>${productData[i].discount}</th>
              <th>${productData[i].total}</th>             
              <th>${productData[i].category}</th>
              <th><button onclick="updateProduct(${i})">update</button></th>
              <th><button onclick="deleteProduct(${i})">delete</button></th>
            </tr>
  `;
  }
  tbody.innerHTML = table;
  if (productData.length > 0) {
    document.getElementById("delete-all").style = "display:block;";
    document.getElementById(
      "delete-all"
    ).innerHTML = `delete all (<span>${productData.length}</span>)`;
  } else {
    document.getElementById("delete-all").innerHTML = "";
    document.getElementById("delete-all").style = "display:none;";
  }
}

//delete product ////////////////////////////////////////////////////////////////////
function deleteProduct(i) {
  productData.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(productData));
  showProduct();
}

//delete all products /////////////////////////////////////////////////////////////////
function deleteAll() {
  localStorage.clear();
  productData.splice(0);
  showProduct();
}
//update product ////////////////////////////////////////////////////////////////////
function updateProduct(i) {
  tbody.style = "pointer-events: none;";
  title.value = `${productData[i].title}`;
  price.value = `${productData[i].price}`;
  tax.value = `${productData[i].tax}`;
  add.value = `${productData[i].add}`;
  discount.value = `${productData[i].discount}`;
  total.innerHTML = `${productData[i].total}`;
  category.value = `${productData[i].category}`;
  temp = i;
  mode = "update";
  getTotal();
  scroll({
    top: 0,
    behavior: "smooth",
  });
  // title.focus();
  count.style = "display:none;";
  create.innerHTML = "update";
}
//search////////////////////////////////////////////////////////////////////////////
let searchMode = "title";
function getSearchMode(id) {
  if (id == "byTitle") {
    searchMode = "title";
  } else {
    searchMode = "category";
  }
  search.placeholder = `search by ${searchMode}`;
  search.value = "";
  search.focus();
}

function searchProduct(value) {
  let table = "";
  for (let i = 0; i < productData.length; i++) {
    if (searchMode == "title") {
      if (productData[i].title.includes(value)) {
        table += `
    <tr>
                <th>${i + 1}</th>
                <th>${productData[i].title}</th>
                <th>${productData[i].price}</th>
                <th>${productData[i].tax}</th>
                <th>${productData[i].add}</th>
                <th>${productData[i].discount}</th>
                <th>${productData[i].total}</th>
                <th>${productData[i].category}</th>
                <th><button onclick="updateProduct(${i})">update</button></th>
                <th><button onclick="deleteProduct(${i})">delete</button></th>
              </tr>
    `;
      }
    } else {
      if (productData[i].category.includes(value)) {
        table += `
    <tr>
                <th>${i + 1}</th>
                <th>${productData[i].title}</th>
                <th>${productData[i].price}</th>
                <th>${productData[i].tax}</th>
                <th>${productData[i].add}</th>
                <th>${productData[i].discount}</th>
                <th>${productData[i].total}</th>
                <th>${productData[i].category}</th>
                <th><button onclick="updateProduct(${i})">update</button></th>
                <th><button onclick="deleteProduct(${i})">delete</button></th>
              </tr>
    `;
      }
    }
  }
  tbody.innerHTML = table;
}
