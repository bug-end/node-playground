const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

const filePath = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(filePath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        const content = fileContent.toString().trim();
        if (content !== '') {
          cart = JSON.parse(content);
        }
      }

      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex((product) => product.id === id);
      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct;
      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.quantity++;

        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, quantity: 1 };

        cart.products.push(updatedProduct);
      }

      // sum up the total price with type conversion
      cart.totalPrice += Number(productPrice);

      fs.writeFile(filePath, JSON.stringify(cart), (err) => console.log(err));
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) return;

      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find((product) => product.id === id);
      updatedCart.products = updatedCart.products.filter((product) => product.id !== id);
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice * product.quantity;

      fs.writeFile(filePath, JSON.stringify(updatedCart), (err) => console.log(err));
    });
  }

  static getCart(cb) {
    fs.readFile(filePath, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
