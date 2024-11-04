const express = require('express');
const app = express();
const router = express.Router();
const db = require('./database');

const port = process.env.PORT || 8000;

router.use(function (req, res, next) {
    console.log('/' + req.method);
    next();
})


app.use('/', router);

app.listen(port, function () {
  console.log('Database on!')
})