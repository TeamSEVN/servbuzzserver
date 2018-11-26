let mongoose = require("mongoose");

//creating the schema that will be used for buzzes
let BuzzSchema = new mongoose.Schema(
  {
    //this will be used to track how long it's been since it was created
    time: { type: Date, default: Date() },
    //this will be the messages the buzzee sees
    message: { type: String },
    //this will tell the app whether or not a message has caused a notification
    delivered: { type: Boolean, default: false }
  },
  { collection: "Buzz" }
);

mongoose.model("Buzz", BuzzSchema);
