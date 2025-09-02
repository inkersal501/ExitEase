const router = require("express").Router();
const {authMiddleware}  = require("../middlewares");
const {userController} = require("../controllers");

router.post("/resign", authMiddleware.auth, userController.resign);
router.get("/check-resign", authMiddleware.auth, userController.checkResign);
router.post("/responses", authMiddleware.auth, userController.responses);

module.exports = router;