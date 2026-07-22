// Zod validation middleware

const validate = (schema) => {
  return (req, res, next) => {
    try {
      // Validate request body using Zod schema
      const validatedData = schema.parse(req.body);

      // Replace body with validated/sanitized data
      req.body = validatedData;

      next();

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors.map((err) => ({
          field: err.path[0],
          message: err.message
        }))
      });
    }
  };
};

export default validate;
