const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

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
  res.status(404).render('404', { pageTitle: '404 Page Not Found' });
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
