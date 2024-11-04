const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

// Set the view engine to pug
app.set('view engine', 'pug');

// Import route handlers
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Enable parsing of JSON data in request bodies
app.use(express.json());

// Built-in middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
