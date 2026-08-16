const Joi = require("joi");

// ================= REGISTER USER =================

const registerUserSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required(),

  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required(),

  password: Joi.string()
    .min(6)
    .max(100)
    .required(),
});

// ================= LOGIN USER =================

const loginUserSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required(),

  password: Joi.string()
    .required(),
});

// ================= UPDATE USER =================

const updateUserSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .optional(),

  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .optional(),

  role: Joi.string()
    .valid("user", "admin")
    .optional(),
}).min(1);

module.exports = {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
};