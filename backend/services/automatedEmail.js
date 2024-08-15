const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const { User } = require("../models");

async function sendAutomatedEmail(user, subject, emailDetails) {
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
      subject: subject,
      text: `Hi, ${user.fullname}.\n${emailDetails.emailContent.intro}\n${emailDetails.emailContent.action.instruction}`,
      html: emailHtml,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return { success: true, message: `Response sent to: ${user.email}` };
  } catch (err) {
    return { success: false, message: "Error sending email", error: err };
  }
}

module.exports = sendAutomatedEmail;
