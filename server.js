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

app.get('/cities', (req, res) => {
   connection.query('SELECT * FROM listOfCities;', 
  (err, data) => {
    if (err) return res.status(500);
    res.json(data);
  })
})

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

// app.get('/arr', (req, res) => {
//   // connection.connect(function (err) {
//   //   if (err) throw err;
//   //   console.log("Connected!");
//     let sql = "INSERT INTO tasksList (taskDescription, dueDate, employee, finishedDate) VALUES ?";

//     connection.query(sql, [arr], function (err, result) {
//       if (err) throw err;
//       // console.log("Number of records inserted: " + result.affectedRows);
//     });
//   // });
// });

// app.get('/upd', (req, res) => {
//   // let today = new Date();
//   // let dd = String(today.getDate()).padStart(2, '0');
//   // let mm = String(today.getMonth() + 1).padStart(2, '0');
//   // let yyyy = today.getFullYear();

//   // today = mm + '/' + dd + '/' + yyyy;
//   connection.query(`UPDATE tasksList
//   SET FinishedDate = '2022-03-10'
//   WHERE FinishedDate IS NULL;`, (err, data) => {
//     if (!err) {
//       // console.log(data);
//     }
//   });
// });

// app.get('/updworker', (req, res) => {
//   connection.query(`UPDATE tasksList
//   SET Employee = 'John'
//   WHERE Employee IS NULL;`, (err, data) => {
//     if (!err) {
//       // console.log(data);
//     }
//   });
// });

// app.get('/delete', (req, res) => {
//   connection.query(
//   `DELETE FROM tasksList 
//   WHERE DueDate < FinishedDate;`, (err, data) => {
//     if (!err) {
//       // console.log(data);
//     }
//   });
// });
// app.get('/task', (req, res) => {
//   connection.query('SELECT * FROM tasksList;', 
//   (err, data) => {
//     if (err) return res.status(500);
//     res.json(data);
//   })
// });

// app.get('/task/:id', (req, res) => {
//   connection.query(`SELECT ID, TaskDescription, DueDate, Employee, FinishedDate FROM tasksList WHERE ID = ${req.params.id};`, 
//   (err, data) => {
//     if (err) return res.status(500);
//     res.json(data);
//   })
// });


// const arr = [
//   {
//     id: 1,
//     description: "create ER-diagram",
//     due: "2020-05-20",
//     employee: "Alex",
//     finished: "2019-05-20",
//   },
//   {
//     id: 2,
//     description: "connect node.js to mysql",
//     due: "2013-05-20",
//     employee: "John",
//     finished: "2017-05-20",
//   },
//   {
//     id: 3,
//     description: "create get-request handler /task",
//     employee: "Alex",
//     finished: "2015-04-20",
//   },
//   {
//     id: 4,
//     description: "create post-request handler /task",
//     due: "2005-04-20",
//     employee: "Donald",
//   },
//   { id: 5, description: "create sql-query for get tasks", employee: "John" },
//   {
//     id: 6,
//     description: "create sql-query for add task",
//     due: "2004-03-20",
//     employee: "Martin",
//     finished: "2004-03-20",
//   },
//   { id: 7, 
//     description: "configure server to auto deploy", 
//     due: "2012-03-20" },
// ];


// app.get('/tasklistadd', function (req, res) {

//   arr.forEach(item => {
//       console.log(item.due);
//       connection.query(`INSERT INTO tasksList (TaskDescription, DueDate, Employee, FinishedDate)
//       VALUES ('${item.description}', '${item.due == undefined ? null : item.due}', '${item.employee}', '${item.finished}');`, 
//       (err, data) => {
//       if (!err) {
//         // console.log(data);
//       }
//     });
//   })
// });
// app.post('/', function (req, res) {
//   users.push(req.body);
//   res.json(req.body);
// });

// app.put("/user/:id", function (req, res) {
//   const idOfUser = parseInt(req.body.id);
//   const userIdx = users.findIndex((user) => user.id == idOfUser);

//   if (userIdx !== -1) {
//     const oldUser = users[userIdx];
//     users[userIdx] = { ...oldUser, ...req.body };
//     res.json(users[userIdx]);
//   } else {
//     res.status(404).json();
//   }
// });

// app.delete("/user/:id", function(req, res) {
//   const idOfUser = parseInt(req.params.id);
//   users = users.filter((user) => user.id != idOfUser);
//   res.json(users);
// })

// app.get('/user', function (req, res) {
//   res.json(users);
//  });

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});