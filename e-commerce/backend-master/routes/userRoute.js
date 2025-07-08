const express = require("express")

// Creates an instance of the router
const router = express.Router()
const auth = require("../auth")

const userController = require("../controllers/userController");


// Controller starts
router.post("/registerUser", userController.registerUser);

router.post("/login", userController.loginUser);

router.get("/profile", userController.profileDetails);

/*router.get("/cart", auth.verify, userController.getCart);*/

router.patch("/updateRole/:userId", auth.verify, userController.updateRole);

router.post("/:productId/checkOut", auth.verify,userController.checkOut);

/*router.post("/:productId/addToCart", auth.verify, userController.addToCart);

router.delete("/:productId/deleteCart", auth.verify, userController.deleteCart);
*/

module.exports = router;
