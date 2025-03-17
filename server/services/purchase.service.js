

const Purchase = require("../models/purchase.model");

// get all purchases
async function getAllPurchases(res) {
  const purchases = await Purchase.find().populate([
    "customer",
    "products.product",
  ]);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Purchases fetched successfully",
    data: purchases,
  });
}

// update purchase status
async function updatePurchaseStatus(req, res) {
  await Purchase.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        status: req.body.status,
      },
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Purchase status updated successfully",
  });
}

module.exports = {
  getAllPurchases,
  updatePurchaseStatus,
};
