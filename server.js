const express = require('express');
const mongodb = require('mongodb');
const app = express();
const port = 3001;

const { MongoClient } = require('mongodb');
const url = "mongodb+srv://myaangel312:gjcnIsB5Qyg9V1c3@cluster0.clfet6q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database connected!");
  db.close();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
});