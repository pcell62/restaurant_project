import { Order } from "../models/orderSchema.js";

export const createOrder = async (req, res) => {
  // Check if all required fields are present in the request body
  if (
    !req.body.userName ||
    !req.body.email ||
    !req.body.address ||
    !req.body.items ||
    !req.body.totalPrice
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Create a new order instance
  const order = new Order({
    userName: req.body.userName,
    email: req.body.email,
    address: req.body.address,
    items: req.body.items, // Assuming items are passed as an array of objects with name and quantity
    totalPrice: req.body.totalPrice,
  });

  try {
    // Save the order to the database
    const createdOrder = await Order.create(order);

    // Respond with the created order
    return res.status(201).json(createdOrder);
  } catch (error) {
    // Handle any errors that occur during the creation process
    return res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    // Retrieve all orders from the database
    const orders = await Order.find({});

    // Respond with the count and data of orders
    return res.status(200).json({
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    return res.status(500).json({ message: error.message });
  }
};

export const doneOrder = async (req, res) => {
  const orderId = req.params.orderId; // Assuming orderId is passed as a parameter

  try {
    // Find the order by orderId and update its status to
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: "Completed" },
      { new: true } // To return the updated order
    );

    if (!updatedOrder) {
      // If order is not found, return 404
      return res.status(404).json({ message: "Order not found." });
    }

    // Respond with the updated order
    return res.status(200).json(updatedOrder);
  } catch (error) {
    // Handle any errors that occur during the process
    return res.status(500).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    return res.status(200).json(deletedOrder);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
