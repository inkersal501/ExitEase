const router = require("express").Router();
const {authMiddleware}  = require("../middlewares");
const {userController} = require("../controllers");

router.use(authMiddleware.auth);
router.post("/resign", userController.resign);
router.get("/check-resign", userController.checkResign);
router.post("/responses", userController.responses);

module.exports = router;