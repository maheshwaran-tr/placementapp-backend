import authService from "../services/authService.js";
import userService from "../services/userService.js";
import studentService from "../services/studentService.js";
import staffService from "../services/staffService.js";
import adminService from "../services/adminService.js";

import bcrypt from "bcryptjs";

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
    res.json({ user, accesstoken, refreshToken });
  } catch (error) {
    const err = new Error(`Error in logging user - ${error.message}`);
    err.statusCode = 401;
    next(err);
  }
};

const register = async (req, res, next) => {
  const username = req.body.rollno;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

  const alreadyExists = await userService.findUserByUsername(username);
  if (alreadyExists) {
    const err = new Error("User already exists");
    err.statusCode = 400;
    return next(err);
  }

  try {
    let resData;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.createUser({
      username,
      email,
      password:hashedPassword,
      role,
    });

    if (user.role === "admin") {
      // Data except email, password and role
      const { email, password, role, ...adminData } = req.body;
      const admin = await adminService.createAdmin({
        user_id: user.user_id,
        ...adminData,
      });
      resData = { user, admin };
    } else if (user.role === "staff") {
      // Data except email, password and role
      const { email, password, role, ...staffData } = req.body;
      const staff = await staffService.createStaff({
        user_id: user.user_id,
        ...staffData,
      });
      resData = { user, staff };
    } else {
      // Data except email, password and role
      const { email, password, role, ...studentData } = req.body;
      const student = await studentService.createStudent({
        user_id: user.user_id,
        ...studentData,
      });
      resData = { user, student };
    }
    res.status(201).json(resData);
  } catch (error) {
    const err = new Error(`Error in registering user - ${error.message}`);
    next(err);
  }
};

const refreshTheToken = async (req, res, next) => {
  try {
    const userId = req.userId; // Correct way to access userId

    const user = await userService.findUserById(userId);

    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 401;
      return next(err); // Ensure execution stops here
    }

    // Generate a new token
    const accessToken = authService.generateAccessToken(user.user_id);
    const refreshToken = authService.generateRefreshToken(user.user_id);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    const err = new Error(`Error in refreshing token: ${error.message}`);
    err.statusCode = 500;
    next(err);
  }
};

export default { login, register, refreshTheToken };