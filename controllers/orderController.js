const Order = require("../models/orderModel");
const ResUtil = require("../utils/res");

const createOrder = async (req, res) => {
  const { user, products } = req.body;
  try {
    const order = await Order.create({ user, products });
    ResUtil.SUCCESS(req, res, { order }, "Order Created SuccessFully.");
  } catch (error) {
    ResUtil.VALIDATION_ERROR(
      req,
      res,
      { error: error.message },
      "Error while Creating Order"
    );
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "products.product"
    );
    if (!order)
      return ResUtil.VALIDATION_ERROR(
        req,
        res,
        { error: error.message },
        "ORDER_NOT_FOUND"
      );
    ResUtil.SUCCESS(req, res, { order }, "SUCCESS");
  } catch (error) {
    ResUtil.VALIDATION_ERROR(req, res, { error: error.message }, "ERROR");
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id }).populate(
      "products.product"
    );
    ResUtil.SUCCESS(req, res, { orders }, "SUCCESS");
  } catch (error) {
    ResUtil.VALIDATION_ERROR(req, res, { error: error.message }, "ERROR");
  }
};

module.exports = { createOrder, getOrder, getUserOrders };
