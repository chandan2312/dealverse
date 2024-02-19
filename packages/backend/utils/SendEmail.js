import nodemailer from "nodemailer";

export default async function sendEmail(to, subject, htmlTemplate) {
	try {
		const transporter = nodemailer.createTransport({
			service: process.env.SMTP_SERVICE,
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});

		const info = await transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject,
			html: htmlTemplate,
		});

		console.log("Message sent: %s", info.messageId);
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
		return info;
	} catch (error) {
		console.log(error.message);
		console.log(error);

		return null;
	}
}
