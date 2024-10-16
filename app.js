const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.json());

// Built-in middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
