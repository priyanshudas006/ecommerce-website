// place order using COD Method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.log(error)
    res.json({
        success:false,
        message: error.message
    })
  }
};
// placing orders using Stripe method
const placeOrderStripe = async (req, res) => {};
// placing orders using Razorpay method
const placeOrderRazorpay = async (req, res) => {};
// All orders data for Admin panel
const allOrders = async (req, res) => {};
// User order data for admin panel
const userOrders = async (req, res) => {};
//update order status from Admin panel
const updateStatus = async (req, res) => {};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  updateStatus,
  userOrders,
};
