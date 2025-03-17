/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* internal import */
const productController = require("../controllers/product.controller");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new product
router.post(
  "/add-product",
  verify,
  authorize("superAdmin", "admin"),
  upload("product").fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "gallery", maxCount: 10 }
  ]),
  productController.addProduct
);

// get all products
router.get(
  "/get-products",
  productController.getProducts
);
router.get("/get-detail-products", productController.getDetailsProducts);
router.get("/get-product-cart", productController.getProductCart);

// update product
router.patch(
  "/update-product/:id",
  verify,
  authorize("superAdmin", "admin"),
  upload("product").fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "gallery", maxCount: 5 }
  ]),
  productController.updateProduct
);

router.patch(
  "/update-product-approve/:id",
  verify,
  authorize("superAdmin"),
  productController.updateApproveProduct
);
router.patch(
  "/update-product-reject/:id",
  verify,
  authorize("superAdmin"),
  productController.updateRejectProduct
);

router.patch(
  "/update-product-review/:id",
  verify,
  authorize("admin"),
  productController.updateReviewProduct
);


router.patch(
  "/update-product-status/:id",
  verify,
  authorize("superAdmin","admin"),
  productController.updateStatusProduct
);

// get a single product
router.get("/get-product/:id", productController.getProduct);

// filtered products
router.get("/filtered-products", productController.getFilteredProducts);

// delete product
router.delete(
  "/delete-product/:id",
  verify,
  authorize("superAdmin", "admin"),
  productController.deleteProduct
);

module.exports = router;
