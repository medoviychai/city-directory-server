const express = require('express');
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'rootroot',
  database: 'Cities'
});
connection.connect((err) => {
  if (!err) { 
    console.log("SUCCESS");
  } else {
    console.log("ERROR: " + err);
  }
});

const corsOpts = {
   origin: '*',
 
   methods: [
     'GET',
     'POST',
   ],
 
   allowedHeaders: [
     'Content-Type',
   ],
 };
 
 app.use(cors(corsOpts));

app.get('/cities', (req, res) => {
   connection.query('SELECT * FROM listOfCities;', 
  (err, data) => {
    if (err) return res.status(500);
    res.json(data);
  })
})

app.get('/cities/:id', (req, res) => {
   connection.query(`SELECT id, name, logo, image, description, population, average_salary, air_temperature_winter, air_temperature_summer, ap_price_meter, fuel_cost, unemployment_rate, top_position, bus_ticket FROM listOfCities WHERE id = ${req.params.id};`, 
   (err, data) => {
     if (err) return res.status(500);
     res.json(data);
   })
 });

 app.get('/countofcities', function (req, res) {
   const count = parseInt(req.query.count);
   const offset = parseInt(req.query.offset);
   connection.query(`SELECT * FROM listOfCities;`, 
   (err, data) => {
     if (err) return res.status(500);
     res.send({ data: data.slice(offset, offset + count), count: data.length });
   })   
 });

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});