import { keywords } from "./keywords.js";

export const verificationCodeTempalte = (user, addUserDetails = false) => {
	let title = `OTP To Confirm Your Account - ${process.env.APP_NAME}`;
	let paragraph_use = `Use the following code to confirm your account.`;
	let paragraph_link = `If the button doesn't work, copy and paste the following link into your browser.`;
	let paragraph_time = `This code will expire in 30 minutes.`;
	let paragraph_ignore = `If you didn't make this request, you can safely ignore this email.`;
	let paragraph_footer = `This email was sent by`;
	let paragraph_oldAccount = `You have already registered but not verified. Here are your old account details.`;

	const lg = process.env.LANG;
	const lang = lg.toString();
	if (lang === "kr") {
		title = `계정 확인을 위한 OTP - ${process.env.APP_NAME}`;
		paragraph_use = `다음 코드를 사용하여 계정을 확인하십시오.`;
		paragraph_link = `버튼이 작동하지 않는 경우 다음 링크를 브라우저에 복사하여 붙여넣으십시오.`;
		paragraph_time = `이 코드는 30분 후에 만료됩니다.`;
		paragraph_ignore = `이 요청을 하지 않은 경우 이 이메일을 안전하게 무시할 수 있습니다.`;
		paragraph_footer = `이 이메일은 다음에 의해 전송되었습니다`;
		paragraph_oldAccount = `이미 등록되어 있지만 확인되지 않았습니다. 여기에 이전 계정 세부 정보가 있습니다.`;
	}

	const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - ${process.env.APP_NAME}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f2f2f2;
    }
    .container {
      max-width: 600px;
      margin: 50px auto;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
    }
    h2 {
      color: #333;
      margin-bottom: 20px;
      text-align: center;
    }
    p {
      color: #666;
      margin-bottom: 20px;
      line-height: 1.5;
    }
    .otp-code {
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
    }
    .button:hover {
      background-color: #0056b3;
    }
    .footer {
      margin-top: 30px;
      text-align: center;
    }
    .footer p {
      color: #999;
      font-size: 12px;
    }
    .link {
      color: #007bff;
      text-decoration: none;
    }
    .link:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2 style="color: #007bff;">${title}</h2>
    ${
					addUserDetails
						? `
    <p>${paragraph_oldAccount}</p>
    <p><strong>Username</strong> - ${user.username}</p>
    <p><strong>Email</strong> - ${user.email}</p>
    
    `
						: ""
				}
    <p>${paragraph_use}</p>
    <div class="otp-code" style="color: #333;">${
					user.verificationCode.code
				}</div>
    <p>${keywords.or[lang]}</p>
    <p>${paragraph_link} </p>
    <p><a href="${process.env.FURL}/verifyUser/?email=${user.email}&code=${
					user.verificationCode.code
				}" class="link">${keywords.clickHere[lang]}</a></p>
    <p>${paragraph_time}</p>
    <p>${paragraph_ignore}</p>
    
    <p>${keywords.bestRegards[lang]},<br> ${process.env.APP_NAME}</p>
    <div class="footer">
      <p>${paragraph_footer} ${process.env.APP_NAME} &copy; 2024</p>
    </div>
  </div>
</body>
</html>
`;

	return template;
};
