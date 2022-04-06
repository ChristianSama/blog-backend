import express from "express";
import path from 'path';
import fs from "fs";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/posts", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
    if (err) throw err;
  let users = JSON.parse(data.toString());
  res.json(users); 
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = new Number(5000).toString();
}

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
