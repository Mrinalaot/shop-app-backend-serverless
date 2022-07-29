import Joi from "joi";

export const generateResponse = (statusCode: number, input: Object) => {
  return {
    statusCode,
    body: JSON.stringify(input),
    headers: {
      "Access-Control-Allow-Origin": "localhost:3000",
      "Access-Control-Allow-Credentials": true,
    },
  };
};

export const productBodySchema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(30).required(),
  birthyear: Joi.number().integer().min(1970).max(2013),
  count: Joi.number().integer().min(0),
  description: Joi.string().min(3).max(30),
  price: Joi.number().integer().min(0),
  title: Joi.string().min(3).max(30),
});
