const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/admin.controller");
const checkAdmin = require("../middlewares/admin.middleware");

router.get("/resignations", auth, checkAdmin,  controller.getResignations);
router.put("/conclude_resignation", auth, checkAdmin, controller.concludeResignation);

module.exports = router;