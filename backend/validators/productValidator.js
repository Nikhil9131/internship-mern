const Joi = require("joi");

// ================= CREATE PRODUCT =================

const createProductSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required(),

  description: Joi.string()
    .trim()
    .min(5)
    .max(1000)
    .required(),

  price: Joi.number()
    .min(0)
    .required(),

  category: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required(),

  stock: Joi.number()
    .integer()
    .min(0)
    .required(),

  image: Joi.string()
    .trim()
    .max(500)
    .optional(),
});

// ================= UPDATE PRODUCT =================

const updateProductSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .optional(),

  description: Joi.string()
    .trim()
    .min(5)
    .max(1000)
    .optional(),

  price: Joi.number()
    .min(0)
    .optional(),

  category: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .optional(),

  stock: Joi.number()
    .integer()
    .min(0)
    .optional(),

  image: Joi.string()
    .trim()
    .max(500)
    .optional(),
}).min(1);

module.exports = {
  createProductSchema,
  updateProductSchema,
};