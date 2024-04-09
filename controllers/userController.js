import express from 'express';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/userSchema.js";
import nodemailer from "nodemailer";

// Gmail Smtp

const router = express.Router();

// @desc    Register new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
    const { empId, email, password } = req.body

  if (!empId || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if email exists
  const emailExists = await User.findOne({ email })

  if (emailExists) {
    res.status(400)
    throw new Error('Email already exists')
  }
  
  // Check if id exists
  const idExists = await User.findOne({ empId })

  if (idExists) {
    res.status(400)
    throw new Error('Id already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    empId,
    email,
    password: hashedPassword,
  })

  if (user) {
    console.log(`New User Created with id ${empId}`);
    res.status(201).json({
      _id: user.id,
      empId: user.empId,
      email: user.email,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
    const {_id, empId, email} = await User.findById(req.user.id);
    res.json({
        _id, empId, email
    });
});

// @desc    Request Reset Password
// @route   GET /api/users/resetPassword
// @access  Public
export const resetPassword = asyncHandler(async(req, res) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      const {password} = req.body;
      // Get user from the token
      const email = decoded.email;

      const user = await User.findOne({ email });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user.password = hashedPassword;

      await user.save();

      return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

// @desc    Request Forgot Password
// @route   GET /api/users/forgotPassword
// @access  Public
export const forgotPassword = asyncHandler(async (req, res) => {
  const {email} = req.body;

  if (!email) {
    res.status(400)
    throw new Error('Please enter an Email')
  }

  // Check if email exists
  const emailExists = await User.findOne({ email })

  if (!emailExists) {
    res.status(400)
    throw new Error('Email does not exist')
  } 

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn : '1h' });

  try{
    sendPasswordReset(email, token);
    res.status(200).json({ message: 'Password reset email sent successfully.' });
  }
  catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ message: 'Internal server error while sending email.' });
  }
})

// Send Email with Reset Link
const sendPasswordReset = asyncHandler(async(email, token) => {

  const transporter = nodemailer.createTransport({
    host : 'smtp.gmail.com',
    port : 587,
    secure : false,
    requireTLS : true,
    auth : {
      user:process.env.emailUser,
      pass:process.env.emailPassword,
    }
  })

  const mailOptions = {
    from: process.env.emailUser,
    to: email, 
    subject: 'Reset Your Password',
    text: `Click the following link to reset your password: <a href="<clientside url>/resetPassword?token=${token}">Link</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });

})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }

export default router;