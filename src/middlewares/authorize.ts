import { NextFunction, Request, Response } from "express";
import { getUserById } from "../services/UserService";

export function authorize(roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUserById(req.body.uid);

    if (!user) {
      return res
        .status(403)
        .json({ error: true, message: "You are not authorized" });
    }
    if (roles.includes(user.role)) {
      req.body.user = user;
      next();
    }
    return res
      .status(403)
      .json({ error: true, message: "You are not authorized" });
  };
}
