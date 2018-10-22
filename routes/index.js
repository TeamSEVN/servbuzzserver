let router = require("express").Router();

router.use("/users", require("./userRoute"));

module.exports = router;
