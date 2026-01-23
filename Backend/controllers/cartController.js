import userModel from "../models/userModel.js";

/* ---------------- ADD TO CART ---------------- */
const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message: "Added to cart",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- UPDATE CART ---------------- */
const updateCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (!cartData[itemId]) cartData[itemId] = {};

    if (quantity <= 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message: "Cart updated",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- GET USER CART ---------------- */
const getUserCart = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel.findById(userId);

    res.json({
      success: true,
      cartData: userData.cartData || {},
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { addToCart, updateCart, getUserCart };
