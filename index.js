const express = require('express');
const app = express();
const admin = require('./src/routes/adminRoutes')
const employee = require('./src/routes/employeeRoutes')
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || '127.0.0.1';

app.get('/', function (req, res) {
  res
  .status(200)
  .json({
    message: 'Hello World'
  })
})

app.use('/admin', admin);
// app.use('/employees', employee);

app.listen(3000, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})