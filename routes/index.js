let router = require("express").Router();

//sets the working directories for users and buzzes
router.use("/users", require("./userRoute"));
router.use("/buzzes", require("./buzzRoute"));

module.exports = router;
