const express = require("express");
const path = require("path");
const moment = require("moment");
const app = express();
const port = 8086;
app.use(express.static(__dirname + "/public"));

const timeCheck = function (req, res, next) {
  var temp = moment().format("a");
  var time = moment().format("hhmm");
  if (temp == "am") {
    if ((parseInt(time) < 0900) || (parseInt(time) >= 1200)){
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + "/public/error.html"));
      });
    }else {
      app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname + "/public/home.html"));
      });
      app.get("/services", (req, res) => {
        res.sendFile(path.join(__dirname + "/public/services.html"));
      });
      app.get("/contact", (req, res) => {
        res.sendFile(path.join(__dirname + "/public/contact.html"));
      });
    }
    console.log("request at ", moment().format("hh:mm a"), "on");
    next();
  } else {
    if (parseInt(time) > 0500) {
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + "/public/error.html"));
      });
    } else {
      app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname + "/public/home.html"));
      });
      app.get("/services", (req, res) => {
        res.sendFile(path.join(__dirname + "/public/services.html"));
      });
      app.get("/contact", (req, res) => {
        res.sendFile(path.join(__dirname + "/public/contact.html"));
      });
    }
  }
  console.log("request at ", moment().format("hh:mm a"), "off");
  next();
};

app.use(timeCheck);
app.listen(port, () => {
  console.log(
    "The server is running," +
      " please, open your browser at http://localhost:%s",
    port
  );
});
