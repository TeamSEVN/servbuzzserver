let router = require("express").Router();
let User = require("../models/User");

//get a list of users
// router.get("/", (req, res) => {
//   User.find()
//     .then(result => res.send(result))
//     .catch(error => res.status(500).send(error));
// });


router.post("/signup", (req, res) => {
  let password = req.body.password;
  //let passwordcon = req.body.passwordcon;
  let name = req.body.name;
  let email = req.body.email;

  let newUser = new User();
  newUser.email = email;
  newUser.name = name;
  newUser.password = newUser.generateHash(password);
  //newUser.passwordcon = newUser.generateHash(passwordcon);
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

// //checks for email being in the database
// router.post("/check", (req, res) => {
//   let email = req.body.email;
//   User.find({ email: email })
//     .then(result =>
//       res
//         .status(200)
//         .send({ count: result.length })
//         .catch(error => res.send(error.message))
//     );
// });

module.exports = router;