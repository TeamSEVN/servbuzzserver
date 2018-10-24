let router = require("express").Router();
let User = require("../models/User");

router.post("/signup", (req, res) => {
  let password = req.body.password;
  let email = req.body.email;
  let newUser = new User();
  newUser.email = email;
  newUser.password = newUser.generateHash(password);
  newUser
    .save()
    .then(result => res.send(result))
    .catch();
});

router.post("/signin", (req, res) => {
  let password = req.body.password;
  let email = req.body.email;
  User.findOne({ email: email })
    .then(result => {
      if (result && result.validPassword(password)) {
        let { password, ...noPassword } = result._doc;
        res.send(noPassword);
      } else {
        console.log(result);
        res.send("cannot find email");
      }
    })
    .catch(error => res.send(error.message));
});

module.exports = router;
