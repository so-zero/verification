const { mailtrapClient, sender } = require("./mailtrap");
const { VERIFICATION_EMAIL_TEMPLATE } = require("./emailTemplates");
const HttpError = require("../models/errorModel");

async function verificationEmail(email, verificationToken) {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "이메일 인증을 하세요.",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`이메일 인증 에러`, error);
    return next(new HttpError(`이메일 인증 에러: ${error}`));
  }
}

module.exports = { verificationEmail };
