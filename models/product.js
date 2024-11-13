const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path');

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const filePath = path.join(rootDir, 'data', 'products.json');
    fs.readFile(filePath, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static async fetchAll() {
    try {
      const filePath = path.join(rootDir, 'data', 'products.json');
      const fileContent = await fs.promises.readFile(filePath, 'utf8');
      const products = JSON.parse(fileContent);
      return products;
    } catch (err) {
      console.error('Error fetching products:', err);
      return [];
    }
  }
};
