const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res) => {
  const newProduct = new Product(req.body.title);
  newProduct.save();
  res.redirect('/');
};

exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render('shop', { prods: products, pageTitle: 'Shop', path: '/' });
  });
};
