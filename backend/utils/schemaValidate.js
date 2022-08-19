const Joi = require("joi");

exports.userRegisterInputValidate = (inputData) => {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(5)
      .trim()
      .required()
      .label("Username"),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .trim()
      .required()
      .label("Email"),
    password: Joi.string()
      .min(5)
      .pattern(new RegExp("^[a-zA-Z0-9]{5}$"))
      //   .regex(/^[a-zA-Z0-9]{5}/)
      .trim()
      .required()
      .label("Password"),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm Password")
      .messages({ "any.only": "{{#label}} does not match" }),
  });

  return schema.validate(inputData, { abortEarly: false });
};

exports.userLoginInputValidate = (inputDate) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .label("Email"),
    password: Joi.string().min(5).required().label("Password"),
  });

  return schema.validate(inputDate);
};
