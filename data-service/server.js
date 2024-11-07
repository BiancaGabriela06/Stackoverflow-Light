const express = require('express');
const app = express();
const router = express.Router();
const db = require('./database/createDatabase');
const authRoutes = require("./routes/authRoutes");
const questionsRoutes = require("./routes/questionsRoutes")
const metricsRoutes = require('./routes/metricsRoutes');

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
app.use('/metrics', metricsRoutes);

app.listen(port, function () {
  console.log('http://localhost:' + port + '/');
})