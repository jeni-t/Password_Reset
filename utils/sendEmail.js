const postmark = require("postmark");

const client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN); //  Ensure API Token is in .env

const sendEmail = async (to, subject, body) => {
  try {
     // console.log("Sending email to:", to);
     // console.log("Email content:", body);
      
      await client.sendEmail({
          From: process.env.SENDER_EMAIL,  // Use verified email
          To: to,
          Subject: subject,
          TextBody: body
      });

      console.log(" Email sent successfully!");
  } catch (error) {
      console.error(" Email sending failed:", error);
  }
};


module.exports = sendEmail;
