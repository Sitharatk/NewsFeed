// backend/middleware/newsValidation.js
const Joi = require('joi');

const newsSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  // ... other fields ...
  publishedAt: Joi.date().default(Date.now),
  isBreaking: Joi.boolean().default(false)
});

exports.validateNews = (req, res, next) => {
  const { error } = newsSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};