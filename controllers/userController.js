const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const ResUtil = require("../utils/res");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username?.trim() && !email?.trim() && !password?.trim()) {
      return ResUtil.VALIDATION_ERROR(
        req,
        res,
        { error: "ALL_FIELDS_ARE_REQUIRED" },
        "ERROR"
      );
    }
    const user = await User.create({ username, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    ResUtil.SUCCESS(req, res, { token, user }, "SUCCESS");
  } catch (error) {
    ResUtil.VALIDATION_ERROR(req, res, { error: error.message }, "ERROR");
  }
};

const getUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return ResUtil.VALIDATION_ERROR(
        req,
        res,
        { error: "USER_ID_REQUIRED" },
        "ERROR"
      );
    }
    const user = await User.findById(req.params.id).select("-password");
    if (!user)
      return ResUtil.NOTFOUND(req, res, { error: "USER_NOT_FOUND" }, "ERROR");
    ResUtil.SUCCESS(req, res, { user }, "SUCCESS");
  } catch (error) {
    ResUtil.VALIDATION_ERROR(req, res, { error: error.message }, "ERROR");
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username.trim() && !email.trim()) {
      return ResUtil.VALIDATION_ERROR(
        req,
        res,
        { error: "USERNAME_AND_EMAIL_REQUIRED" },
        "ERROR"
      );
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return ResUtil.VALIDATION_ERROR(
        req,
        res,
        { error: "USER_NOT_FOUND" },
        "ERROR"
      );
    }
    ResUtil.SUCCESS(req, res, { user }, "SUCCESS");
  } catch (error) {
    ResUtil.VALIDATION_ERROR(
      req,
      res,
      { error: error.message },
      "ERROR"
    );
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return ResUtil.VALIDATION_ERROR(
        req,
        res,
        { error: "USER_ID_REQUIRED" },
        "ERROR"
      );
    }
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      ResUtil.NOTFOUND(req, res, { error: "USER_NOT_FOUND" }, "ERROR");
    }

    ResUtil.SUCCESS(req, res, {}, "USER_DELETED_SUCCESSFULLY");
  } catch (error) {
    ResUtil.VALIDATION_ERROR(req, res, { error: error.message }, "ERROR");
  }
};

module.exports = { registerUser, getUser, updateUser, deleteUser };
