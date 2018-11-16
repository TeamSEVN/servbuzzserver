//importing dependencies
let mongoose = require("mongoose");
let bcrypt = require("bcryptjs");

//formatting the JSON object
let UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    signUpDate: { type: Date, default: Date.now() }
  },
  { collection: "ServBuzzUsers" }
);

//generates a hash for the given string
UserSchema.methods.generateHash = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

UserSchema.methods.validPassword = function(password) {
  //tests a string against the generated hash
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("Users", UserSchema);
