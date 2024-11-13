const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.fetchAll();
    res.render('shop', { prods: products, pageTitle: 'Shop', path: '/' });
  } catch (err) {
    console.error(err);
    res.status(500).render('error');
  }
};
