const { body, validationResult } = require("express-validator");

// Validation rules for event creation
const validateEvent = [
  body("title")
    .notEmpty()
    .withMessage("Title is required.")
    .isString()
    .withMessage("Title must be a string."),
  body("description")
    .notEmpty()
    .withMessage("Description is required.")
    .isString()
    .withMessage("Description must be a string."),
  body("event_date")
    .notEmpty()
    .withMessage("Event date is required.")
    .isISO8601()
    .withMessage("Event date must be in a valid date format.")
    .custom((value) => {
      const eventDate = new Date(value);
      if (eventDate < new Date()) {
        throw new Error("Event date cannot be in the past.");
      }
      return true;
    }),
  body("event_time")
    .notEmpty()
    .withMessage("Event time is required.")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Event time must be in HH:mm format."),
  body("category")
    .notEmpty()
    .withMessage("Category is required.")
    .isIn(["Music", "Art", "Technology", "Education", "Sports"])
    .withMessage("Invalid category. Choose from Music, Art, Technology, Education, or Sports."),
  body("max_attendees")
    .notEmpty()
    .withMessage("Maximum attendees is required.")
    .isInt({ min: 1 })
    .withMessage("Max attendees must be a positive integer."),
  body("ticket_price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Ticket price must be a positive number."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array().map((err) => ({ field: err.param, message: err.msg })),
      });
    }
    next();
  },
];

module.exports = validateEvent;
