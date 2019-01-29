const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  let contents = fs.readFileSync('./data/frontend-geo.json'); 
  var jsonContent = JSON.parse(contents);
  res.send(JSON.stringify(jsonContent));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);