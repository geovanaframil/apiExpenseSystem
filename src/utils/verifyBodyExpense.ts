const Joi = require("joi");

const postBodySchema = Joi.object({
  name: Joi.string().required(),
  categoryID: Joi.string().required(),
  userID: Joi.string().required(),
  amount: Joi.number().strict().required(),
});

export default postBodySchema;
