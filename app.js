const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

// Import route handlers
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Enable parsing of JSON data in request bodies
app.use(express.json());

// Built-in middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
