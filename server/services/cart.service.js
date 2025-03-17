/* internal imports */
const Cart = require("../models/cart.model");
const User = require("../models/user.model");
const Session = require("../models/session.model");

/* add to cart */
exports.addToCart = async (req, res) => {
  const { product, quantity, variation } = req.body;
  const user = await User.findById(req?.user?._id);
  const guest = await Session.findOne({ sessionId: req.sessionID });
  console.log(req.sessionID)
  console.log(variation)
  if (user) {

    const cart = await Cart.create({
      product: product,
      quantity: quantity,
      user: user._id,
      variation,
    });
    await User.findByIdAndUpdate(user._id, {
      $push: { cart: cart._id }
    });
  } else {
    const cart = await Cart.create({
      product: product,
      quantity: quantity,
      guest: guest.userId,
      variation,
    });
    await Session.findOneAndUpdate(
      { sessionId: guest.sessionId }, 
      { $push: { cart: cart._id } }, 
      { new: true } 
    );
  }

  res.status(201).json({
    acknowledgement: true,
    message: "Ok",
    description: "محصول با موفقیت به سبد خرید اضافه شد"
  });
};

/* get from cart */
exports.getFromCart = async (res) => {
  const cart = await Cart.find().populate(["user", "product"]);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Cart fetched successfully",
    data: cart
  });
};

/* update cart */
exports.updateCart = async (req, res) => {
  await Cart.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Cart updated successfully"
  });
};

/* delete cart */
exports.deleteCart = async (req, res) => {
  const cart = await Cart.findByIdAndDelete(req.params.id);

  await User.findByIdAndUpdate(cart.user, {
    $pull: { cart: cart._id }
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Cart deleted successfully"
  });
};
