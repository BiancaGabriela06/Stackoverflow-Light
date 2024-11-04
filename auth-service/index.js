const express = require('express');
const app = express();
const router = express.Router();

const port = process.env.PORT || 8088;

router.use(function (req, res, next) {
    console.log('/' + req.method);
    next();
})


app.use('/', router);

app.listen(port, function () {
  console.log('App listening on port 8088!')
})