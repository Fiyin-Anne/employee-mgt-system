const express = require('express');
const app = express();
const admin = require('./src/routes/adminRoutes')
const employee = require('./src/routes/employeeRoutes')
const dotenv = require('dotenv');
const passport = require('passport');
const passportinit = require('./config/passport')

dotenv.config();

const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || '127.0.0.1';

app.use(express.json());
app.use(passport.initialize());
passportinit();

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