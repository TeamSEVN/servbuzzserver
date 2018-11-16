//importing dependencies
let router = require("express").Router();
let User = require("../models/User");

//creates a new user object with the input from the user
router.post("/register", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let newUser = new User();
  newUser.email = email;
  newUser.password = newUser.generateHash(password);
  newUser
    .save()
    .then(result => res.send(result))
    .catch();
});

//uses the information provided by the user to login to their account and hide the password
router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  User.findOne({ email: email })
    .then(result => {
      if (result && result.validPassword(password)) {
        let { password, ...noPassword } = result._doc;
        console.log(noPassword);
        res.send(noPassword);
      } else {
        console.log(result);
        res.send("cannot find email");
      }
    })
    .catch(error => res.send(error.message));
});

module.exports = router;
