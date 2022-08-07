import { Request, Response } from "express";
import { hashPassword, verifyPassword } from "../services/HashService";
import { generateLogin } from "../services/LoginService";
import { createTokens, verifyToken } from "../services/TokenService";
import {
  findUserByUsername,
  generateUser,
  getUserById,
  getUsers,
} from "../services/UserService";

export async function getAllUsers(req: Request, res: Response) {
  const users = await getUsers();
  return res.status(200).json(users);
}

export async function createUser(req: Request, res: Response) {
  const form = req.body;
  try {
    // Encrypt password before saving to database
    form.password = await hashPassword(form.password);
    // Save Login to database
    console.log("creating login");

    const newLogin = await generateLogin(form);
    console.log("creating user");
    const user = await generateUser(newLogin.id, form);
    // Success, return the result
    return res.status(201).json({
      error: false,
      message: "User has been registered",
      user: user,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "Something went wrong.", errors: err });
  }
}

export async function loginUser(req: Request, res: Response) {
  const form = req.body;
  // 1. Check if user exists in database
  const foundUser = await findUserByUsername(form.username);

  if (!foundUser) {
    return res
      .status(403)
      .json({ error: true, message: "Username or password incorrect." });
  }
  // 2. if Exists, compare password in the database
  const matched = await verifyPassword(foundUser.password, form.password);
  if (!matched) {
    return res
      .status(403)
      .json({ error: true, message: "Username or password incorrect." });
  }
  // 3. If password matches, create an AT and RT
  const tokenBody = {
    id: foundUser.User?.id,
    email: foundUser.User?.email,
  };
  const tokens = createTokens(tokenBody);
  if (tokens) {
    const { accessToken, refreshToken } = tokens;
    // 4. set AT to header and RT to cookie
    res.header("x-auth-token", accessToken);
    res.cookie("refresh-token", refreshToken, { httpOnly: true }); // add secure: true on prod
    // 5. return 200
    return res.status(200).json({
      error: false,
      message: "Login has been successful.",
    });
  }
  return res
    .status(500)
    .json({ error: true, message: "Something went wrong." });
}

export function logoutUser(req: Request, res: Response) {
  res.removeHeader("x-auth-token");
  res.clearCookie("refresh-token");

  return res.sendStatus(204);
}

export async function refreshToken(req: Request, res: Response) {
  // Get refresh token from cookies
  const token = req.cookies["refresh-token"];
  // verify token
  const decoded = verifyToken(token);
  if (!decoded) {
    res.clearCookie("refresh-token");
    return res.status(403).json({ error: true, message: "Invalid token." });
  }

  // Get user from database
  const user = await getUserById(decoded.id);
  if (!user) {
    res.clearCookie("refresh-token");
    return res.status(403).json({ error: true, message: "User not found." });
  }
  // generate new token and refresh token
  const tokenBody = {
    id: user.id,
    email: user.email,
  };
  const tokens = createTokens(tokenBody);
  if (!tokens) {
    return res.status(500).json({
      error: true,
      message: "Something went wrong, please try again.",
    });
  }
  // Set the tokens
  const { accessToken, refreshToken } = tokens;
  res.setHeader("x-auth-token", accessToken);
  res.cookie("refresh-token", refreshToken, { httpOnly: true }); // add secure:true on production
  // return status 200
  return res.status(200).json({ error: false, message: "Tokens refreshed!" });
}
