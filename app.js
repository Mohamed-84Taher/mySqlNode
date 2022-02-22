const express = require("express");
const mysql = require("mysql");

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "nodemysql",
});
db.connect(err => {
  if (err) throw err;
  console.log("db connected...");
});

const app = express();

// create DataBase
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("database created..");
  });
});
// create table
app.get("/createposttable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id INT AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255),PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("post table created..");
  });
});
// add post 2
app.get("/addpost2", (req, res) => {
  let post = { title: "Post Two", body: "This is post two" };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("post two added..");
  });
});
// get posts
app.get("/getposts", (req, res) => {
  let sql = "SELECT * FROM posts";
  db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send("All posts");
  });
});
// get one post
app.get("/getpost/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id=${req.params.id} LIMIT 1`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send("Post");
  });
});

app.listen(5000, () => console.log("server started on port 5000"));
