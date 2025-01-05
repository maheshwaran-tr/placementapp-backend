import authService from "../services/authService.js";
import userService from "../services/userService.js";
import studentService from "../services/studentService.js";
import staffService from "../services/staffService.js";
import adminService from "../services/adminService.js";

import bcrypt from "bcryptjs";
import prisma from "../config/prismaClient.js";

const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Find user by email
    const user = await userService.findUserByUsername(username);

    // Check if user exists
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 401;
      return next(err);
    }

    // Compare password with hashed password
    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const err = new Error("Invalid password");
      err.statusCode = 401;
      return next(err);
    }

    // Generate JWT token
    const accesstoken = authService.generateAccessToken(user.user_id);
    const refreshToken = authService.generateRefreshToken(user.user_id);

    // Send user data along with the token
    res.json({ user, "access_token": accesstoken, "refresh_token": refreshToken });
  } catch (error) {
    const err = new Error(`Error in logging user - ${error.message}`);
    err.statusCode = 401;
    next(err);
  }
};

const register = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

  const alreadyExists = await userService.findUserByUsername(username);
  if (alreadyExists) {
    const err = new Error("User already exists");
    err.statusCode = 400;
    return next(err);
  }

  if (role !== "admin" && role !== "staff" && role !== "student") {
    const err = new Error("Invalid role");
    err.statusCode = 400;
    return next(err);
  }

  try {
    let resData;

    const result = await prisma.$transaction(async (prisma) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = await userService.createUser({
        username,
        email,
        password: hashedPassword,
        role,
      });
      
      if (user.role === "admin") {
        // Data except email, password and role
        const { username, password, role, ...adminData } = req.body;
        const admin = await adminService.createAdmin({
          user_id: user.user_id,
          admin_rollno: user.username,
          ...adminData,
        });
        resData = { user, admin };
      } else if (user.role === "staff") {
        // Data except email, password and role
        const { username, password, role, ...staffData } = req.body;
        const staff = await staffService.createStaff({
          user_id: user.user_id,
          staff_rollno: user.username,
          ...staffData,
        });
        resData = { user, staff };
      } else {
        // Data except email, password and role
        const { username, password, role, ...studentData } = req.body;
        const student = await studentService.createStudent({
          user_id: user.user_id,
          rollno: user.username,
          ...studentData,
        });
        resData = { user, student };
      }
    });

    res.status(201).json(resData);
  } catch (error) {
    const err = new Error(`Error in registering user - ${error.message}`);
    next(err);
  }
};

const refreshTheToken = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken; // Extract refreshToken from the body

    if (!refreshToken) {
      const err = new Error("Refresh token is required");
      err.statusCode = 400; // Bad Request
      return next(err);
    }

    // Verify the refreshToken
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET); // Use refresh secret
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        const err = new Error("Refresh token has expired");
        err.statusCode = 401; // Unauthorized
        return next(err);
      }
      const err = new Error("Invalid refresh token");
      err.statusCode = 401; // Unauthorized
      return next(err);
    }

    // Find user by ID in the decoded refresh token
    const user = await userService.findUserById(decoded.id);

    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 401; // Unauthorized
      return next(err);
    }

    // Generate new tokens
    const accessToken = authService.generateAccessToken(user.user_id);
    const newRefreshToken = authService.generateRefreshToken(user.user_id);

    res.status(200).json({ accessToken, refreshToken: newRefreshToken, user });
  } catch (error) {
    const err = new Error(`Error in refreshing token: ${error.message}`);
    err.statusCode = 500; // Internal Server Error
    next(err);
  }
};


// const refreshTheToken = async (req, res, next) => {
//   try {
//     const userId = req.userId; // Correct way to access userId

//     const user = await userService.findUserById(userId);

//     if (!user) {
//       const err = new Error("User not found");
//       err.statusCode = 401;
//       return next(err); // Ensure execution stops here
//     }

//     // Generate a new token
//     const accessToken = authService.generateAccessToken(user.user_id);
//     const refreshToken = authService.generateRefreshToken(user.user_id);

//     res.json({ accessToken, refreshToken });
//   } catch (error) {
//     const err = new Error(`Error in refreshing token: ${error.message}`);
//     err.statusCode = 500;
//     next(err);
//   }
// };

export default { login, register, refreshTheToken };
