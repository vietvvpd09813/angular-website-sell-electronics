const { User } = require("../models"); 
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const register = async (username, password, email) => {
  try {
    const isUsername = await User.findOne({ where: { username } });
    const isEmail = await User.findOne({ where: { email } });
    if(isUsername) {
      return {status: 401,message: "Username đã tồn tại"};
    }
    if(isEmail) {
      return {status: 401,message: "Email đã tồn tại"};
    }

    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);

    await User.create({ username, email, password });

    const message = "Create is successfully";
    return {status: 200, message};
  } catch (error) {
    console.error("Error login user:", error);
    return {status: 500, message: "Internal Server Error" };
  }
}

const login = async (email, password) => {
  try {
    console.log("email", email);
    console.log("password", password);

    email = _.trim(email);
    password = _.trim(password);

    const check = await User.findOne({ where: { email } });

    if (!check) {
      return {status: 401, message:  "Sai tài khoản hoặc mật khẩu!"};
    }

    const checkPass = bcrypt.compareSync(password, check.dataValues.password);
    console.log(checkPass);

    if (checkPass) {
      const accessToken = jwt.sign(
        {
          id: check.dataValues.id,
          role: check.dataValues.role,
          username: check.dataValues.username,
          email: check.dataValues.email,
        },
        "TuanDevAccessToken",
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign(
        {
          id: check.dataValues.id,
        },
        "TuanDevRefreshToken",
        { expiresIn: "3d" }
      );

      return { status: 200, data: 
        {accessToken, 
          refreshToken, 
          id: check.dataValues.id,
          role: check.dataValues.role, 
          username: check.dataValues.username,
          isActive: check.dataValues.isActive,
          email: check.dataValues.email,} };
    } else {
      return {status: 401, message: "Sai tài khoản hoặc mật khẩu!" };
    }
  } catch (error) {
    console.error("Error login user:", error);
    return {status: 500, message: "Internal Server Error" };
  }
};

const logout = async () => {};

module.exports = {
  register,
  login,
  logout,
};
