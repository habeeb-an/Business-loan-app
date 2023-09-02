var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const session = require('express-session');

const cors=require('cors');

var app = express();

const allowedOrigins = ['http://localhost:5173', 'https://yourfrontend.com'];
app.use(cors({
  credentials:true,
  origin:allowedOrigins,
}));
app.use(session({
  secret: 'your-secret-key', // Replace with a strong, random secret
  resave: false,
  saveUninitialized: true,
  // You can customize other options as needed
}));

var providerRouter = require('./routes/providers');
var balancesheetRouter = require('./routes/xerobalancesheet.js');
const { balancesheet } = require('./prisma');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/providers', providerRouter);
app.use('/balance-sheet', balancesheetRouter);


module.exports = app;
