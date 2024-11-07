const express = require('express');
const app = express();
const router = express.Router();
const db = require('./database/createDatabase');
const authRoutes = require("./routes/auth");
const questionsRoutes = require("./routes/questions")

const port = process.env.PORT || 8000;
app.use(express.json());
router.use(function (req, res, next) {
    console.log('/' + req.method);
    next();
})

app.get('/', (req, res) => {
  res.send("Data-service Home");
})
app.use('/auth', authRoutes);
app.use('/questions', questionsRoutes);

app.listen(port, function () {
  console.log('Database on!')
})