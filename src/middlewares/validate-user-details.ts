import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export function validateUserDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const form = req.body;
  const toValidate = { name: form.name, email: form.email, age: form.age };

  const schema = Joi.object({
    name: Joi.string().required().trim().label("Name"),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .trim()
      .label("Email"),
    age: Joi.number().required().label("Age").min(1).max(200),
  });

  const { error, value } = schema.validate(toValidate);

  if (error) {
    return res
      .status(400)
      .json({ error: true, message: error.details[0].message });
  }

  req.body = {
    ...req.body,
    name: value.name,
    email: value.email,
    age: value.age,
  };
  next();
}
