let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
let morgan = require("morgan");
let mongoose = require("mongoose");
let app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(require("./routes"));
let mongoDB = "mongodb://user:password1@ds115753.mlab.com:15753/vinny";
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true }
);
let db = mongoose.connection;
db.on("error", error => console.log("connection error: " + error));
db.once("open", () => {
  console.log("connected to database...");
  app.emit("ready");
});
app.on("ready", () => {
  let server = app.listen(process.env.PORT || 8080, () => {
    let port = server.address().port;
    console.log("running on", port);
  });
});
