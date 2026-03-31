const User = require("../../modules/user/user.model");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } else {
      return res
        .status(401)
        .json({ message: "Unauthorized, No token provided" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ message: "Unauthorized, Token is not valid" });
  }
};

module.exports = {
  protect,
};
