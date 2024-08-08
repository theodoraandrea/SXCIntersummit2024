const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const { User } = require("../models");

async function sendAutomatedEmail({ userId, emailDetails }) {
  try {
    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Create email generator with custom options
    const mailGenerator = new Mailgen(emailDetails.mailgenOptions);

    // Find the user by ID
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Define email content
    const emailBody = {
      body: {
        name: user.fullname,
        ...emailDetails.emailContent,
      },
    };

    // Generate HTML email
    const emailHtml = mailGenerator.generate(emailBody);

    // Define email options
    const mailOptions = {
      from: `"${emailDetails.fromName}" <${emailDetails.from}>`,
      to: user.email,
      subject: `Welcome to SxC Intersummit - ${user.fullname}`,
      text: `Hi, ${user.fullname}.\n${emailDetails.emailContent.intro}\nPlease join the WA group by clicking the link below!`,
      html: emailHtml,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return { success: true, message: `Email sent to: ${user.email}` };
  } catch (err) {
    return { success: false, message: "Error sending email", error: err };
  }
}

module.exports = sendAutomatedEmail;
