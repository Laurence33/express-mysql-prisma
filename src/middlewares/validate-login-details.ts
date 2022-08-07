import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import joiPasswordComplexity from "joi-password-complexity";

export function validateLoginDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = Joi.object({
    username: Joi.string().required().trim().label("Username"),
    password: joiPasswordComplexity().required().label("Password"),
  });

  const fields = { username: req.body.username, password: req.body.password };
  const { error, value } = schema.validate(fields);
  if (error) {
    return res
      .status(400)
      .json({ error: true, message: error.details[0].message });
  }

  req.body = {
    ...req.body,
    username: value.username,
    password: value.password,
  };
  next();
}
