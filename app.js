const express = require('express');
const app = express();
const router = express.Router();
const db = require('./database');


const path = __dirname + '/views/';
const port = process.env.PORT || 8080;

router.use(function (req, res, next) {
    console.log('/' + req.method);
    next();
})

app.use(express.static(path));
app.use('/', router);

app.listen(port, function () {
  console.log('App listening on port 8080!')
})