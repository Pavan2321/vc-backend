const Product = require("../models/productModel");
const ResUtil = require("../utils/res");

const getProducts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const products = await Product.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    ResUtil.SUCCESS(req, res, { products }, "SUCCESS");
  } catch (error) {
    ResUtil.VALIDATION_ERROR(req, res, { error: error.message }, "ERROR");
  }
};

const getProduct = async (req, res) => {
  try {
    if (!req.params.id) {
      return ResUtil.VALIDATION_ERROR(
        req,
        res,
        { error: "PRODUCT_ID_REQUIRED" },
        "ERROR"
      );
    }
    const product = await Product.findById(req.params.id);
    if (!product)
      return ResUtil.VALIDATION_ERROR(
        req,
        res,
        { error: "PRODUCT_NOT_FOUND" },
        "ERROR"
      );
    ResUtil.SUCCESS(req, res, { product }, "SUCCESS");
  } catch (error) {
    ResUtil.VALIDATION_ERROR(req, res, { error: error.message }, "ERROR");
  }
};

const createProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  try {
    if (!name && !description && !price && !stock) {
      return ResUtil.VALIDATION_ERROR(
        req,
        res,
        { error: "ALL_FIELDS_ARE_REQUIRED" },
        "ERROR"
      );
    }
    const product = await Product.create(req.body);
    ResUtil.SUCCESS(req, res, { product }, "SUCCESS");
  } catch (error) {
    ResUtil.VALIDATION_ERROR(req, res, { error: error.message }, "ERROR");
  }
};

const updateProduct = async (req, res) => {
  try {
    if (!req.params.id) {
      return ResUtil.VALIDATION_ERROR(
        req,
        res,
        { error: "PRODUCT_ID_REQUIRED" },
        "ERROR"
      );
    }
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    ResUtil.SUCCESS(req, res, { product }, "SUCCESS");
  } catch (error) {
    ResUtil.VALIDATION_ERROR(req, res, { error: error.message }, "ERROR");
  }
};

const deleteProduct = async (req, res) => {
  try {
    if (!req.params.id) {
      return ResUtil.VALIDATION_ERROR(
        req,
        res,
        { error: "PRODUCT_ID_REQUIRED" },
        "ERROR"
      );
    }
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return ResUtil.VALIDATION_ERROR(
        req,
        res,
        { error: "PRODUCT_NOT_FOUND" },
        "ERROR"
      );
    }

    ResUtil.SUCCESS(req, res, {}, "PRODUCT_DELETED_SUCCESSFULLY");
  } catch (error) {
    ResUtil.VALIDATION_ERROR(req, res, { error: error.message }, "ERROR");
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
