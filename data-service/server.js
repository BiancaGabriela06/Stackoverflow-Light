const express = require('express');
const app = express();
const router = express.Router();
const db = require('./database/createDatabase');
const authRoutes = require("./routes/auth");

const port = process.env.PORT || 8000;
app.use(express.json());
router.use(function (req, res, next) {
    console.log('/' + req.method);
    next();
})


app.use('/auth', authRoutes);

app.listen(port, function () {
  console.log('Database on!')
})