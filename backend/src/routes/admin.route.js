const router = require("express").Router(); 
const {adminController} = require("../controllers"); 
  
router.get("/resignations", adminController.getResignations);
router.put("/conclude_resignation", adminController.concludeResignation);
router.get("/exit_response/:resignationId", adminController.getExitresponse);

module.exports = router;