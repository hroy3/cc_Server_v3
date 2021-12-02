//Server landing page
const express = require("express");
const mysql = require("mysql");
const ejs = require("ejs");

// Create express app
const app = express();

//database connection config
// //Kaya: Start Uncomment
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
// //Kaya: Enter Database Password
//     password: '',
//     database: 'Course_Connect'
// });

// //connect to db
// db.connect((err) => {
//     if (err) {
//       throw err;
//     } else {
//       console.log(`Connected to the Database....`);
//     }
//   });
// //Kaya: End uncomment

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to parse HTML form data

// Initialize Middleware
app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));

//Server Routes to Pages; create one for each page
app.get("/", (req, res) => {
  res.render("index");
});

//homepage route
app.get("/home", (req, res) =>{
    res.render("home");
});

app.get("/calendar", (req, res) =>{
  res.render("./html/calendar");
});

app.get("/flashcards", (req, res) =>{
  res.render("./html/flashcards");
});

app.get("/addfriends", (req, res) =>{
  res.render("./html/addfriends");
});

app.get("/groups", (req, res) =>{
  res.render("./html/groups");
});

// //Kaya: Start Uncomment
// app.post("/createaccount", (req, res) => {
//     let data = { studentID: req.body.StudentID, FirstName: req.body.FirstName, LastName: req.body.LastName, 
//         Pass: req.body.Pass, School: req.body.School, State: req.body.State, Email: req.body.Email, UserType: req.body.UserType };
//     let sql = `INSERT INTO Accounts SET ?`;
//     let query = db.query(sql, data, (err, result) => {
//         if (err) {
//           throw err;
//         }
//       //  res.send(`User Account Created.`);
//           res.redirect('/home');
//       });
//       console.log(data);
// });

// //Enter courses in Home Page

// app.post("/entercourses", (req, res) => {
//     let coursedata = {class: req.body.wishlist-item}
//       let sql = `INSERT INTO class SET ?`;
//       let query = db.query(sql, coursedata, (err, result) => {
//         if (err) {
//                 throw err;
//               }
            
//           });
//         console.log(coursedata);
//   });


// //Kaya: End Uncomment


//start server: in terminal, type node index
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));