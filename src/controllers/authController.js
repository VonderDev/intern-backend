require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userAuth = require("../models/auth.model");
const mongoose = require("mongoose");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userAuth.findOne({ email });
    if (!user) {
      throw {
        message: "User donesn't exist.",
        status: 404,
      };
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw {
        message: "Invalid credentials.",
        status: 404,
      };
    }
    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.Secret_Key,
      { expiresIn: "1h" }
    );
    res.status(200).json({ resuit: user, token });
  } catch (error) {
    next(error);
  }
};
exports.signup = async (req, res, next) => {
  const { email, password, username, role, firstName, lastName } = req.body;
  try {
    if (!email) {
      throw {
        message: "Email is required.",
        status: 204,
      };
    }
    if (!password) {
      throw {
        message: "Email is password.",
        status: 204,
      };
    }
    if (!username) {
      throw {
        message: "Email is username.",
        status: 204,
      };
    }
    if (!firstName) {
      throw {
        message: "firstName is required.",
        status: 204,
      };
    }
    if (!lastName) {
      throw {
        message: "lastName is required.",
        status: 404,
      };
    }
    const hashedpassword = await bcrypt.hash(password, 10);

    const resuit = await userAuth.create({
      _id: req._id ? req._id : mongoose.Types.ObjectId(),
      email,
      password: hashedpassword,
      username,
      role,
      firstName,
      lastName,
    });

    const token = jwt.sign(
      { _id: resuit._id, email: resuit.email, role: resuit.role },
      process.env.Secret_Key,
      { expiresIn: "1d" }
    );
    console.log(res);
    res.status(200).json({ resuit, token });
  } catch (error) {
    next(error);
  }
};
