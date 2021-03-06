const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts');

const app = express();
mongoose.connect("mongodb+srv://root:DdfNHTaJIKmhzJB1@meancourse-jmco4.mongodb.net/node-angular?retryWrites=true").then(() => {
  console.log("connected to database!");
}).catch(() => {
  console.log("connection to database failed!");
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use("/api/posts", postsRoutes);

module.exports = app;
