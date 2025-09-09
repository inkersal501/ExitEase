const router = require("express").Router(); 
const {userController} = require("../controllers");
 
router.get("/me", userController.getUser);
router.post("/resign", userController.resign);
router.get("/check-resign", userController.checkResign);
router.post("/responses", userController.responses);
router.post("/logout", userController.logout);
module.exports = router;