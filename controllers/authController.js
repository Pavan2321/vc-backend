const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const ResUtil = require("../utils/res");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return ResUtil.VALIDATION_ERROR(
        req,
        res,
        {},
        "Invalid email or password"
      );
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return ResUtil.VALIDATION_ERROR(
        req,
        res,
        {},
        "Invalid email or password"
      );
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send token and user details
    ResUtil.SUCCESS(
      req,
      res,
      {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      },
      "User Login Successful"
    );
  } catch (error) {
    ResUtil.SERVER_ERROR(
      req,
      res,
      { error: error.message },
      "Error while Login"
    );
    res.status(500).json({ error: error.message });
  }
};

module.exports = { loginUser };
