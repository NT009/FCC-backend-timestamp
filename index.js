// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api", function (req, res) {
  let result = {};
  const date = new Date();
  result["unix"] = date?.valueOf();
  result["utc"] = date?.toGMTString();

  res.json(result);
});

app.get("/api/:timestamp", function (req, res) {
  const { timestamp } = req.params;
  console.log("timeStamp", timestamp);

  let result = {};

  const date = new Date(timestamp);
  const unixDate = new Date(Number(timestamp));
  if (date == "Invalid Date" && unixDate == "Invalid Date") {
    result["error"] = "Invalid Date";
  } else {
    if (date != "Invalid Date") {
      result["unix"] = date?.valueOf();
      result["utc"] = date?.toGMTString();
    } else {
      result["unix"] = Number(timestamp);
      gmtDate = unixDate?.toGMTString();
      result["utc"] = gmtDate;
    }
  }

  res.json(result);
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
