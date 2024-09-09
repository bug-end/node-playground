const express = require('express');
const app = express();
const port = 3000;

app.use('/', (req, res, next) => {
  console.log('In the middleware!', req.url);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
