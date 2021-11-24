//Server landing page
const express = require("express");
const mysql = require("mysql");
const ejs = require("ejs");

// Create express app
const app = express();

//database connection config
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Course_Connect'
});

//connect to db
db.connect((err) => {
    if (err) {
      throw err;
    } else {
      console.log(`Connected to the Database....`);
    }
  });

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

app.post("/createaccount", (req, res) => {
    let data = { studentID: req.body.StudentID, FirstName: req.body.FirstName, LastName: req.body.LastName, 
        School: req.body.School, State: req.body.State, Email: req.body.Email, UserType: req.body.UserType };
    let sql = `INSERT INTO Accounts SET ?`;
    let query = db.query(sql, data, (err, result) => {
        if (err) {
          throw err;
        }
        res.send(`User Account Created.`);
      });
      console.log(data);
});


//start server: in terminal, type node index
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));