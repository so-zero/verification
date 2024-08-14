const { mailtrapClient, sender } = require("./mailtrap");
const {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
} = require("./emailTemplates");
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

async function welcomeEmail(email, name) {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "f9a7608a-6ecd-4678-9238-0964503815f1",
      template_variables: {
        company_info_name: "Auth Company",
        name: name,
      },
    });

    console.log("이메일이 성공적으로 발송되었습니다.", response);
  } catch (error) {
    console.error(`이메일 발송 에러`, error);
    return next(new HttpError(`이메일 발송 에러: ${error}`));
  }
}

async function resetPasswordEmail(email, resetURL) {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "비밀번호 재설정",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`비밀번호 재설정 에러`, error);
    return next(new HttpError(`비밀번호 재설정 에러: ${error}`));
  }
}

module.exports = { verificationEmail, welcomeEmail, resetPasswordEmail };
