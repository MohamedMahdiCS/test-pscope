
const crypto = require("crypto");

function generateResetToken() {
    return crypto.randomBytes(20).toString("hex");
}


const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function generateToken(user) {
	return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
	  expiresIn: "1d", // expires in 24 hours
	});
  }


  async function sendVerificationEmail(user, token) {
    const msg = {
      to: user.email,
      from: 'personascope88@gmail.com', // Make sure this email is verified in your SendGrid account
      subject: 'Email Verification',
      text: `Click on this link to verify your email: ${process.env.FRONTEND_URL}/verify/${token}`
    };
    try {
        await sgMail.send(msg);
        console.log("Email sent successfully");
    } catch (error) {
        console.log("Error sending email:", error);
        if (error.response) {
          console.error("Error response from SendGrid:", error.response.body)
        }
    }
}

function authenticate(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send({ message: 'Invalid token.' });
    }
}

function validateResetToken(user, token) {
    console.log("Debug: User resetToken from DB: ", user.resetToken); // Debug line
    console.log("Debug: Token from request: ", token); // Debug line

    if (user.resetToken !== token) {
        console.log("Debug: Tokens do not match!"); // Debug line
        return false;
    }
    if (Date.now() > user.resetTokenExpiry) {
        console.log("Debug: Token has expired!"); // Debug line
        return false;
    }
    console.log("Debug: Token validated successfully"); // Debug line
    return true;
}

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        // Check if email already exists
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(409).send({ message: "User with given email already exists!" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // Save new user
        const newUser = new User({ ...req.body, password: hashPassword });
        await newUser.save();

        // Generate verification token and send email
        const token = generateToken(newUser);
        await sendVerificationEmail(newUser, token);

        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
		console.error("Detailed Error:", error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/verify/:token", async (req, res) => {
    console.log("Reached /verify/:token route");
    try {
        console.log("Token:", req.params.token);
        const { id } = jwt.verify(req.params.token, process.env.JWT_SECRET);
        console.log("Decoded ID:", id);
        const user = await User.findById(id);
        if (!user) return res.status(400).send("Invalid user.");

        if (user.isVerified) return res.status(400).send("Already verified.");

        await User.findByIdAndUpdate(id, { isVerified: true });
        res.send("Email verified successfully");
    } catch (error) {
        res.status(400).send("Invalid or expired link");
    }
});





// POST route to initiate password reset
router.post("/initiateReset", async (req, res) => {
    const { email } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User with this email does not exist.");
    
    // Generate reset token and expiry
    const resetToken = generateResetToken();
    console.log("Generated Reset Token:", resetToken);  // Logging token
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
    
    // Update user document with reset token and expiry
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();
    
    // Send email with reset link
    const msg = {
        to: email,
        from: "personascope88@gmail.com", // replace with your own email
        subject: "Password Reset",
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.
        Please click on the following link, or paste it into your browser to complete the process within one hour of receiving it:
        ${process.env.FRONTEND_URL}/reset/${resetToken}`
 
    };
    sgMail.send(msg);
    
    res.send("Password reset email sent.");
});




  router.post("/completeReset", async (req, res) => {
    const { token, newPassword } = req.body;
    console.log("Received Reset Token:", token);  // Logging token

    if (!token || !newPassword) {
        return res.status(400).send("Token and newPassword must be provided.");
    }

    try {
        const user = await User.findOne({ resetToken: token });
        console.log("User found:", user);  // Debugging line

        if (!user) {
            return res.status(400).send("No user found with this reset token.");
        }

        // Debugging lines
        console.log("Stored token:", user.resetToken);
        console.log("Received token:", token);
        console.log("Stored expiry:", user.resetTokenExpiry);
        console.log("Current time:", Date.now());

        if (!validateResetToken(user, token)) {  // <-- This should be validateResetToken
            return res.status(400).send("Invalid or expired reset token.");
        }
            // Check if the new password is the same as the old password
        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
        return res.status(400).send("New password cannot be the same as the old password.");
        }

        // Hash new password and update user document
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;

        // Invalidate the reset token and expiry
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.send("Password has been reset.");
    } catch (error) {
        console.log("Error during complete password reset:", error);  // Log any errors
        res.status(500).send("An error occurred.");
    }
});

router.post("/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;
  
    if (!name || !email || !subject || !message) {
      return res.status(400).send("All fields are required.");
    }
  
    // Email to admin
    const msgToAdmin = {
      to: 'personascope88@gmail.com',  // Your verified email
      from: 'personalityapptest@gmail.com',  // Replace with your verified email
      replyTo: email,  // User's email for reply
      subject: `Contact Form: ${subject}`,
      text: `
        You have received a new message from ${name} (${email}).
  
        ${message}
      `
    };
  
    // Confirmation email to user
    const msgToUser = {
      to: email,  // User's email
      from: 'personascope88@gmail.com',  // Your verified email
      subject: 'Thank you for contacting us',
      text: `
        Dear ${name},
  
        Thank you for reaching out to us. We have received your message and will get back to you shortly.
  
        Best regards,
        PersonaScope
      `
    };
  
    try {
        await sgMail.send(msgToAdmin);  // Send email to admin
        await sgMail.send(msgToUser);  // Send confirmation email to user
        res.status(200).send("Emails sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        if (error.response) {
            console.error("Error response from SendGrid:", error.response.body);
        }
        res.status(500).send("Internal Server Error");
    }
  });
  

  
module.exports = router;
