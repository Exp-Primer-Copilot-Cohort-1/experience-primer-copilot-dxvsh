// create a new web server
const express = require("express");
const app = express();
const port = 3000;

// connect to mongodb
const mongoose = require("mongoose");
// DB connection
mongoose.connect('mongodb://localhost:27017/commentDB', {useNewUrlParser: true, useUnifiedTopology: true});
// DB schema
const commentSchema = new mongoose.Schema({
  name: String,
  email: String,
  comment: String
});
// DB model
const Comment = mongoose.model("Comment", commentSchema);

// serve static files
app.use(express.static("public"));
// parse the request body
app.use(express.urlencoded({extended: true}));

// send the home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// receive the form data
app.post("/", (req, res) => {
  const comment = new Comment({
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment
  });
  comment.save();
  res.redirect("/");
});

// receive the comments
app.get("/comments", (req, res) => {
  Comment.find({}, (err, comments) => {
    res.send(comments);
  });
});

// listen to port 3000
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});