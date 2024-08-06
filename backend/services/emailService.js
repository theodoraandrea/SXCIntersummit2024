const nodemailer = require("nodemailer");

// Create a transporter using environment variables or config
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.AUTOMATED_EMAIL_USER,
    pass: process.env.AUTOMATED_EMAIL_PASS,
  },
});

// Function to send email
const sendWelcomeEmail = async (user) => {
  const mailOptions = {
    from: process.env.AUTOMATED_EMAIL_USER,
    to: user.email,
    subject: "Welcome to SxC Intersummit, Future Leader!",
    text: `Hello Future Leader!,\n\nThank you for registering on our website! We're excited to have you on board.\n\nBest regards,\nThe SxC Team`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendWelcomeEmail,
};
