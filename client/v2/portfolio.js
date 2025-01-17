// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const selectSort = document.querySelector('#sort-select');
const selectReasonable = document.querySelector('#reasonable-price');
const span50 = document.querySelector('#p50');
const span90 = document.querySelector('#p90');
const span95 = document.querySelector('#p95');


/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://apiclearfashionferdinandvalancogne.vercel.app/products/search?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price} €</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products :</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;
  spanNbProducts.innerHTML = count;
};

const renderIndicatorsp = products => {
  span50.innerHTML = p50(products);
  span90.innerHTML = p90(products);
  span95.innerHTML = p95(products);
}

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
  renderIndicatorsp(products);
};

/**
 * Declaration of all Listeners
 */

// p50
function p50(products) {
  products.sort(price_asc);
  let index=Math.trunc(products.length/100*50);
  return products[index].price;
};

// p90
function p90(products) {
  products.sort(price_asc);
  let index=Math.trunc(products.length/100*90);
  return products[index].price;
};

// p95
function p95(products) {
  products.sort(price_asc);
  let index=Math.trunc(products.length/100*95);
  return products[index].price;
};

// sort products
function price_asc(a,b){
  if (a.price<b.price){
    return -1;}
  if (a.price>b.price){
    return 1;}
  return 0
  };

function price_desc(a,b){
  if (a.price<b.price){
    return 1;}
  if (a.price>b.price){
    return -1;}
  return 0
  };


function sort(typeOfSort, products) {
  if(typeOfSort=='price-asc'){
    products=products.sort(price_asc);
    return products;
    }
  else if (typeOfSort=='price-desc'){
    products=products.sort(price_desc);
    return products;
    };
  };

// select reasonable price
function reasonable(typeOfReasonable, products){
  let res=[];
  products.forEach((product, i) => {
    if(product.price<=typeOfReasonable){
      res.push(product);
    }
  });
  return res;
};



/**
 * Select the number of products to display
 */
selectShow.addEventListener('change', async (event) => {
  const products = await fetchProducts(currentPagination.currentPage, parseInt(event.target.value));

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

selectPage.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value), parseInt(selectShow.value))
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
   
});

selectSort.addEventListener('change', event =>{
  fetchProducts(currentPagination.currentPage, parseInt(selectShow.value))
    .then(setCurrentProducts)
    .then(() => render(sort(event.target.value, currentProducts), currentPagination))
});

selectReasonable.addEventListener('change', event =>{
  fetchProducts(currentPagination.currentPage, parseInt(selectShow.value))
    .then(setCurrentProducts)
    .then(() => render(reasonable(event.target.value, currentProducts), currentPagination))
});

document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});
