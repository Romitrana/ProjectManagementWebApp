//=========================server for taskmanager app==============================

const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const taskRoutes = require("./routes/task");
const port = process.env.PORT || 8000;

//static files
const publicDirectory = path.join(__dirname, "/public");
const viewPath = path.join(__dirname, "/public/views");
const partialPath = path.join(__dirname, "/partials");
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);
app.use(express.static(publicDirectory));

app.use(express.json());
app.use("/taskManger/api/v1", taskRoutes);

//request----
app.get("/", (req, res) => {
  res.render("index", {
    userName: "romit rana",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    about: "this message is for temporary",
  });
});
app.get("/gallery", (req, res) => {
  res.render("gallery", {
    userName: "romit rana",
  });
});
app.get("/service", (req, res) => {
  res.render("service", {
    userName: "romit rana",
  });
});
app.get("/contact", (req, res) => {
  res.render("contact", {
    userName: "romit rana",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    msg: "Resouce does noty exists",
  });
});

app.listen(port, () => {
  console.log(`Server is Listening at port ${port}...`);
});
