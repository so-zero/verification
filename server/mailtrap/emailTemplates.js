const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>이메일 인증</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">이메일 인증</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>안녕하세요,</p>
    <p>가입해주셔서 감사합니다! 귀하의 인증 코드는 다음과 같습니다:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>등록을 완료하려면 확인 페이지에 이 코드를 입력하세요.</p>
    <p>이 코드는 보안상의 이유로 15분 후에 만료됩니다.</p>
    <p>저희 계정을 만들지 않으셨다면 이 이메일을 무시해 주세요.</p>
    <p>감사합니다.</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>이 이메일은 자동으로 전송된 메시지이므로 회신하지 마시기 바랍니다.</p>
  </div>
</body>
</html>
`;

const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>비밀번호 재설정</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">비밀번호 재설정</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>안녕하세요,</p>
    <p>비밀번호 재설정 요청이 접수되었습니다. 이 요청을 하지 않으셨다면 이 이메일을 무시하세요.</p>
    <p>비밀번호를 재설정하려면 버튼을 클릭하세요:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>이 링크는 보안상의 이유로 1시간 후에 만료됩니다.</p>
    <p>감사합니다.</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
      <p>이 이메일은 자동으로 전송된 메시지이므로 회신하지 마시기 바랍니다.</p>
  </div>
</body>
</html>
`;

const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>비밀번호 재설정 성공</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">비밀번호 재설정 성공</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>안녕하세요,</p>
    <p>귀하의 비밀번호가 성공적으로 재설정되었음을 알려드립니다.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>비밀번호 재설정을 시작하지 않은 경우 고객센터에 문의하세요.</p>
    <p>보안상의 이유로 다음을 권장합니다:</p>
    <ul>
      <li>강력하고 고유한 비밀번호를 사용하세요.</li>
      <li>가능한 경우 2단계 인증 활성화하세요.</li>
      <li>여러 사이트에서 동일한 비밀번호를 사용하지 마세요.</li>
    </ul>
    <p>귀하의 계정을 안전하게 유지하는 데 도움을 주셔서 감사합니다.</p>
    <p>감사합니다.</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>이 이메일은 자동으로 전송된 메시지이므로 회신하지 마시기 바랍니다.</p>
  </div>
</body>
</html>
`;

module.exports = {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
};
