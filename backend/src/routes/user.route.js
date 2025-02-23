const router = require("express").Router();
const auth  = require("../middlewares/auth.middleware");
const controller = require("../controllers/user.controller");

router.post("/resign", auth, controller.resign);

module.exports = router;