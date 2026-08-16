const Joi = require("joi");

const productQuerySchema = Joi.object({
  keyword: Joi.string()
    .trim()
    .max(100)
    .optional(),

  category: Joi.string()
    .trim()
    .max(200)
    .optional(),

  inStock: Joi.boolean()
    .optional(),

  page: Joi.number()
    .integer()
    .min(1)
    .optional(),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .optional(),

  sort: Joi.string()
    .trim()
    .max(100)
    .optional(),

  fields: Joi.string()
    .trim()
    .max(500)
    .optional(),

  price: Joi.object({
    gte: Joi.number().min(0).optional(),
    gt: Joi.number().min(0).optional(),
    lte: Joi.number().min(0).optional(),
    lt: Joi.number().min(0).optional(),
  }).optional(),
}).unknown(false);

module.exports = productQuerySchema;