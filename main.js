const shop = document.getElementById('shop');
 
let basket = JSON.parse(localStorage.getItem("data")) || [];

// Produktdatat finns i variabeln shopData (se data.js)


const generateShop = (currentCategory) => {

    const navBar = document.querySelector('.categories');
    navBar.innerHTML = '';
    shop.innerHTML = '';
    const categories = [...new Set(shopData.map(item => item.category))]

    categories.forEach(category => {
        const navItem = document.createElement('li');
        navItem.classList.add('navCat')
        navItem.innerHTML = `<a href="#">${category}</a>`;
        navBar.appendChild(navItem)
        navItem.addEventListener('click',() => {
            generateShop(category)
        })

    })
    

    // Generera alla produkter med dynamisk HTML och Array.protype.map() samt join()

    const products = shopData.filter(element => { 
        if (currentCategory == '') {
            return true;
        }
        return element.category == currentCategory;
    }).map(element => {
    return `      <div id='product_${element.id}' class="item">
    <img width="220" src=${element.image} alt=""> 
    <div class="details">
       <h3>${element.title}</h3>
       <p>${element.description}</p>
       <div class="price-quantity">
       <h2>${element.price}</h2>
       <div class="buttons">
           <i onclick="decrement(${element.id})" class="bi bi-dash-lg"></i>
           <div id="productCount" class="quantity">0</div>
          <i onclick="increment(${element.id})" class="bi bi-plus-lg"></i>
       </div>
       </div>
   </div>
   </div>`;
});

products.forEach((product, index) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    const productUl = document.createElement('ul');
    productUl.innerHTML = products[index];
    productDiv.appendChild(productUl);

    shop.appendChild(productDiv);
});

};

generateShop('');

const cart = {};

const updateCart = () => {
    const cartElement = document.querySelector('#cartAmount');
    const total = Object.keys(cart).reduce((sum,curr) => {
        return sum + cart[curr].count;
    },0);
    cartElement.innerHTML = total; 
}

const increment = (id) => {
    // Om användaren klickar på + på produkten 
    if (cart[id] != undefined) {
        cart[id].count += 1;
    } else {
        cart[id] = {
            count: 1
        };
    }
    const productTotalElement = document.querySelector(`#product_${id} #productCount`);
    productTotalElement.innerHTML = cart[id].count; 
    updateCart();
}

const decrement = (id) => {
    // Om användaren klickar på - på produkten 
    if (cart[id] && cart[id].count > 0) {
        cart[id].count -= 1;
    }
    const productTotalElement = document.querySelector(`#product_${id} #productCount`);
    productTotalElement.innerHTML = cart[id].count; 
    updateCart();
}