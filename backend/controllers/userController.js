import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import { google } from "googleapis";
import nodemailer from "nodemailer";

dotenv.config();

function send_mail(name, recipient, OPT) {
  const { OAuth2 } = google.auth;

  const OAuth2_client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );
  OAuth2_client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
  google.options({ auth: OAuth2_client });

  const accessToken = OAuth2_client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: "gmail",
    scope: "https://mail.google.com",
    auth: {
      type: "OAuth2",
      user: process.env.USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const mail_options = {
    from: "Kadom",
    to: recipient,
    subject: "Account Recovery Code",
    text: `Hi ${name}, this is your recovery code: ${OPT}`,
  };

  transport.sendMail(mail_options, function (error, result) {
    if (error) {
      console.log("Error: ", error);
    } else {
      console.log("Success: ", result);
    }
    transport.close();
  });
}

function generateOTP(limit) {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < limit; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email Or Password");
  }
});

const getAccountRecoveryCode = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const recoveryCode = user.rec_code.slice(1, -1);
    send_mail(user.firstName, user.email, recoveryCode);
    res.json({
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      rec_code: recoveryCode,
    });
  } else {
    res.status(401);
    throw new Error("User Not Found, Try Entering A Valid Email.");
  }
});

const authRecoveryUser = asyncHandler(async (req, res) => {
  const { email, rec_code } = req.body;

  const user = await User.findOne({ email });

  const matchCode = user.rec_code.slice(1, -1) === rec_code;

  if (user && matchCode) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid OTP Entered");
  }
});

const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phoneNum } = req.body;
  const userExists = await User.findOne({ email });
  const phoneExists = await User.findOne({ phoneNum });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists, Try Using Another Email");
  } else {
    if (phoneExists) {
      res.status(400);
      throw new Error(
        "Phone Number Already Registered, Try Using Another Phone Number"
      );
    } else {
      const user = await User.create({
        firstName,
        lastName,
        email,
        phoneNum,
        rec_code: `R${generateOTP(4)}L`,
      });
      if (user) {
        res.status(201).json({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error("Invalid User Data");
      }
    }
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phoneNum = req.body.phoneNum;
    user.rec_code = `R${generateOTP(4)}L`;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phoneNum: updatedUser.phoneNum,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const updateUserPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (
    user &&
    req.body.password &&
    req.body.oldPassword &&
    (await user.matchPassword(req.body.oldPassword))
  ) {
    user.rec_code = `R${generateOTP(4)}L`;
    user.password = req.body.password;
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phoneNum: updatedUser.phoneNum,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    if (
      user &&
      req.body.password &&
      req.body.oldPassword &&
      !(await user.matchPassword(req.body.oldPassword))
    ) {
      res.status(404);
      throw new Error("Old Password Entered Is Incorrect");
    } else {
      if (user && req.body.password) {
        user.rec_code = `R${generateOTP(4)}L`;
        user.password = req.body.password;
        const updatedUser = await user.save();

        res.json({
          _id: updatedUser._id,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          phoneNum: updatedUser.phoneNum,
          isAdmin: updatedUser.isAdmin,
          token: generateToken(updatedUser._id),
        });
      } else {
        res.status(404);
        throw new Error("User Not Found");
      }
    }
  }
});

// admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ isAdmin: false });
  res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const updateUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);
  if (user) {
    user.status = req.body.status;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("Request Failed");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.status = req.body.status || user.status;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      status: updatedUser.status,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export {
  authUser,
  getAccountRecoveryCode,
  authRecoveryUser,
  createUser,
  getUserProfile,
  updateUserProfile,
  updateUserStatus,
  updateUserPassword,
  getUserById,
  getUsers,
  updateUser,
};
