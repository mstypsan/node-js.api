const express = require('express');
const validator = require('express-validator');
const app = express();
const port = 3000;
const searchApi = require('./controllers/searchApi');

app.use(validator());
app.get('/v1/employees/autocomplete/', searchApi.autocomplete);

app.use((err, req, res, next) => {
  if (err) {
    console.log(err.data || err.message || {error: 'Something went wrong!'});
    res.status(err.statusCode || err.status || 500).send({error: 'Something went wrong!'});
  } else {
    next();
  }
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
