const Joi = require("joi");

const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("development"),

  PORT: Joi.number()
    .port()
    .default(5001),

  MONGO_URI: Joi.string()
    .required(),

  JWT_SECRET: Joi.string()
    .min(32)
    .required(),

  JWT_EXPIRES_IN: Joi.string()
    .default("7d"),
}).unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(
    `Environment validation failed: ${error.message}`
  );
}

module.exports = value;