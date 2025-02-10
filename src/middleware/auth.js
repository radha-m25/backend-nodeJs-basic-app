const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.AuthToken;
    const decodedToken = jwt.verify(token, "practiceKey");

    const { _id } = decodedToken;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }
    next();
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = userAuth;
