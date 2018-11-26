let router = require("express").Router();
let mongoose = require("mongoose");
let Buzz = mongoose.model("Buzz");

//deliver buzz
router.post("/deliverBuzz/:id", (req, res) => {
  Buzz.findByIdAndUpdate(req.params.id, { $set: { delivered: true } })
    .then(result => res.send(result))
    .catch(error => res.status(400).send(error));
});

//get a list of buzzes
router.post("/fetchBuzzes", (req, res) => {
  Buzz.find()
    .then(result => res.send(result))
    .catch(error => res.status(500).send(error));
});

//add a buzz
router.post("/createBuzz", (req, res) => {
  //declares variable message that will receive a message from the buzzor
  let message = req.body.message;
  let newBuzz = new Buzz();
  newBuzz.message = message;
  newBuzz
    .save()
    .then(result => res.send(result))
    .catch(error => res.status(400).send(error));
});

//delete a buzz
router.delete("/:id", (req, res) => {
  Buzz.findByIdAndDelete(req.params.id)
    .then(result => res.send(result))
    .catch(error => res.status(400).send(error));
});

module.exports = router;
