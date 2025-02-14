// const productList = {

//   render() {
//     const renderHook = document.querySelector("#app");
//     const prodList = document.createElement("ul");
//     prodList.classList.add("product-list");
//     for (const prod of this.products) {
//       const prodEl = document.createElement("li");
//       prodEl.classList.add("product-item");
//       prodEl.innerHTML = `
//       <div>
//         <img src="${prod.imgUrl}" alt="${prod.title}">
//         <div class="product-item__content">
//             <h2>${prod.title}</h2>
//             <p>$${prod.price.toFixed(2)}</p>
//             <p>${prod.description}</p>
//             <button>Add to Cart</button>
//         </div>
//       </div>
//       `;
//       prodList.append(prodEl);
//     }

//     renderHook.append(prodList);
//   },
// };

// productList.render();

const products = [
  {
    title: "Wireless Headphones",
    imgUrl:
      "https://images.pexels.com/photos/3394653/pexels-photo-3394653.jpeg",
    price: 99.99,
    description: "High-quality wireless headphones with noise cancellation.",
  },
  {
    title: "Smartwatch",
    imgUrl: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
    price: 199.99,
    description: "Stylish smartwatch with health tracking and notifications.",
  },
  {
    title: "Gaming Mouse",
    imgUrl:
      "https://images.pexels.com/photos/4792713/pexels-photo-4792713.jpeg",
    price: 49.99,
    description: "Ergonomic gaming mouse with customizable RGB lighting.",
  },
  {
    title: "Bluetooth Speaker",
    imgUrl:
      "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg",
    price: 79.99,
    description:
      "Portable Bluetooth speaker with deep bass and long battery life.",
  },
  {
    title: "Mechanical Keyboard",
    imgUrl:
      "https://images.pexels.com/photos/4792711/pexels-photo-4792711.jpeg",
    price: 129.99,
    description: "Mechanical keyboard with RGB backlighting and fast response.",
  },
  {
    title: "4K Monitor",
    imgUrl:
      "https://images.pexels.com/photos/5702921/pexels-photo-5702921.jpeg",
    price: 299.99,
    description:
      "Ultra HD 4K monitor with high refresh rate for smooth visuals.",
  },
];
class Product {
  constructor(title, imgUrl, price, description) {
    this.title = title || "Default Product";
    this.imgUrl =
      imgUrl ||
      "https://images.pexels.com/photos/5702921/pexels-photo-5702921.jpeg";
    this.price = price || "XX.XX";
    this.description = description || "Default Product Description";
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }

  render() {}
  createRootElement(tag, cssClasses, attributes) {
    const element = document.createElement(tag);
    if (cssClasses) {
      element.classList.add(cssClasses);
    }
    if (attributes) {
      for (const key of attributes) {
        element.setAttribute(key.name, key.value);
      }
    }

    document.getElementById(this.hookId).append(element);

    return element;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Cart extends Component {
  items = [];

  constructor(renderHookId) {
    super(renderHookId);
  }

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: $${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
    <h2>Total: $${0}</h2>
    <button>Order Nw!</button>
    <ul id="cart-list"></ul>`;

    this.totalOutput = cartEl.querySelector("h2");
    return cartEl;
  }

  get totalAmount() {
    let total = 0;
    this.items.forEach((item) => {
      total += item.price;
    });
    return total;
  }

  addItem(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }
}

class ProductList extends Component {
  products = [];
  constructor(renderHookId) {
    super(renderHookId);
    this.fetchProducts();
  }

  fetchProducts() {
    this.products = [...products];
    this.renderProducts();
  }

  renderProducts() {
    this.products.forEach((product) => {
      new ProductItem(product, "prod-list");
    });
  }
  render() {
    const prodList = this.createRootElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list"),
    ]);
    prodList.id = "prod-list";
    if (this.products && this.products.length > 0) {
      this.renderProducts();
    }
  }
}
class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }
  addToCart() {
    App.addToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement("li", "product-item");
    prodEl.innerHTML = `
    <div>
      <img src="${this.product.imgUrl}" alt="${this.product.title}">
      <div class="product-item__content">
          <h2>${this.product.title}</h2>
          <p>$${this.product.price.toFixed(2)}</p>
          <p>${this.product.description}</p>
          <button>Add to Cart</button>
      </div>
    </div>
    `;
    const addCartBtnEl = prodEl.querySelector("button");
    addCartBtnEl.addEventListener("click", this.addToCart.bind(this));
  }
}
class Shop extends Component {
  constructor() {
    super();
  }
  render() {
    this.cart = new Cart("app");

    new ProductList("app");
  }
}

class App {
  static cart;
  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  static addToCart(product) {
    this.cart.addItem(product);
  }
}

App.init();
