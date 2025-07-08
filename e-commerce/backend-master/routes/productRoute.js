const express = require('express');
const router = express.Router();
const product = require("../models/Product");

const auth = require("../auth");

const productController = require("../controllers/productController");


router.post("/addProduct", auth.verify, productController.addProduct);

router.get("/allActiveProducts", productController.allActiveProducts);

router.get("/allProducts", auth.verify, productController.allProducts);

router.get("/retrieveProduct/:productId", productController.retrieveProduct)

router.get("/retrieveProduct2/:productId", productController.retrieveProduct2)

router.put("/updateProduct/:productId", auth.verify, productController.updateProduct);

router.patch("/archive/:productId", auth.verify, productController.archiveProduct);



module.exports = router;