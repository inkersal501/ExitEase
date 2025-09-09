const router = require('express').Router();
const authRoute = require('./auth.route');
const userRoute = require("./user.route");
const adminRoute = require("./admin.route");
const {authMiddleware, adminMiddleware}  = require("../middlewares");

router.use("/auth", authRoute);
router.use(authMiddleware.auth);
router.use("/user", userRoute);
router.use(adminMiddleware.checkAdmin);
router.use("/admin", adminRoute);

module.exports = router;