var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const session = require('express-session');

const cors=require('cors');

var app = express();

const allowedOrigins = ['http://localhost:5173',];
app.use(cors({
  credentials:true,
  origin:allowedOrigins,
}));
app.use(session({
  secret: 'your-secret-key', // Replace 
  resave: false,
  saveUninitialized: true,
  store: new session.MemoryStore({
    checkPeriod: 86400000, 
  }),

}));

var providerRouter = require('./routes/providers');
var balancesheetRouter = require('./routes/balancesheetprofit.js');
var preaccessmentRouter = require('./routes/preassessment.js');
var decisionEngineRouter = require('./routes/decisonengine.js');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/providers', providerRouter);
app.use('/balance-sheet', balancesheetRouter);
app.use('/preassessment', preaccessmentRouter);
app.use('/decisionengine', decisionEngineRouter);


module.exports = app;
