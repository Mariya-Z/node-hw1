import Joi from 'joi';

// TODO replace ...

export const querySchema  = Joi.object().keys({
  login: Joi.string().required(),
  password: Joi.string().pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/).required(),
  age: Joi.number().greater(4).less(130).required(),
  // isDeleted: Joi.boolean().required(),
});

const  errorResponse = (schemaErrors) => {
  const errors = schemaErrors.map((error) => {
    let { path, message } = error;
    return { path, message };
  });
  return {
    status: 'failed',
    errors
  }
}

export const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    });

    if (error) {
      res.status(400).json(errorResponse(error.details))
    } else {
      next();
    }
  }
}
