const express = require("express");
const router = express.Router();
const { Feedback, validateFeedback } = require("../models/feedback");
const auth = require('../routes/authMiddleware'); // Import the auth middleware

// Use the middleware here
router.post("/", auth, async (req, res) => {
  // Validate incoming feedback data
  const { error } = validateFeedback(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const {ageGroup, satisfaction, experienceRating, suggestion } = req.body;
  
  // Now, req.user should be populated
  if (!req.user || !req.user._id) {
    return res.status(401).send({ message: "User not authenticated" });
  }
  const userId = req.user._id;  

  // Save feedback to the database
  const feedback = new Feedback({
    userId,
    ageGroup,
    satisfaction,
    experienceRating,
    suggestion
  });

  await feedback.save();
  res.status(201).send({ message: "Feedback saved successfully" });
});

module.exports = router;
