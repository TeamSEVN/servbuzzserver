//importing dependencies
let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
let morgan = require("morgan");
let mongoose = require("mongoose");

//setup express
let app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

//import the Buzz model
require("./models/Buzz");

//import the routes
app.use(require("./routes"));

//store mongoDB Atlas url
let mongoDB = "mongodb+srv://user:9TSa4Ety5SJpUkn@servbuzzcluster.embtt.mongodb.net/vinny?retryWrites=true&w=majority";
//old connection string======let mongoDB = "mongodb://user:password1@ds115753.mlab.com:15753/vinny";

//connect to the database
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true }
);

//get the connection
let db = mongoose.connection;
//on an error, output to the console
db.on("error", error => console.log("connection error: " + error));
//on connection open, output and tell app we are ready
db.once("open", () => {
  console.log("connected to database...");
  //broadcast a ready event
  app.emit("ready");
});

//listen to the ready event
app.on("ready", () => {
  //setup our app to listen on the heroku port or a local port and start up
  let server = app.listen(process.env.PORT || 8080, () => {
    let port = server.address().port;
    //broadcast the current port
    console.log("running on", port);
  });
});
