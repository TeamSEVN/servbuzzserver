let mongoose = require("mongoose");

//creating the schema that will be used for buzzes
let BuzzSchema = new mongoose.Schema(
  {
    //this will be used to track how long it's been since it was created
    time: { type: Date, default: Date() },
    //this will be the messages the buzzee sees
    message: { type: String }
  },
  { collection: "Buzz" }
);

mongoose.model("Buzz", BuzzSchema);
