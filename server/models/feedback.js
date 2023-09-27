const mongoose = require("mongoose");
const Joi = require("joi");

const feedbackSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    ageGroup: { type: String, required: true },
    satisfaction: { type: String, required: true },
    experienceRating: { type: Number, required: true },
    suggestion: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model("feedback", feedbackSchema);

const validateFeedback = (data) => {
    const schema = Joi.object({
        ageGroup: Joi.string().required(),
        satisfaction: Joi.string().required(),
        experienceRating: Joi.number().required(),
        suggestion: Joi.string().required()
    });
    return schema.validate(data);
};

module.exports = { Feedback, validateFeedback };
