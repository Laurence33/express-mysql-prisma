import { NextFunction, Request, Response } from "express";
import { prisma } from "../services/PrismaClient";

export async function checkEmailForDuplicate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const found = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (found) {
    return res
      .status(400)
      .json({ error: true, message: "Email is already registered." });
  }

  next();
}
