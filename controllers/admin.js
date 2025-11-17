const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;

  const newProduct = new Product(title, imageUrl, description, price);
  newProduct.save();

  res.redirect('/');
};

exports.getEditProduct = (req, res) => {
  const productId = req.params.productId;
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect('/');
  }

  Product.findById(productId, (product) => {
    if (!productId) {
      return res.redirect('/');
    }

    res.render('admin/edit-product', {
      product: product,
      pageTitle: 'Edit product',
      path: '/admin/edit-product',
      editing: editMode,
    });
  });
};

exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render('admin/products', { prods: products, pageTitle: 'Admin Products', path: '/admin/products' });
  });
};

exports.postEditProduct = (req, res) => {};
