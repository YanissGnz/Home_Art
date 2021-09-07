const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
	MAILING_SERVICE_CLIENT_ID,
	MAILING_SERVICE_CLIENT_SECRET,
	MAILING_SERVICE_REFRESH_TOKEN,
	SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(
	MAILING_SERVICE_CLIENT_ID,
	MAILING_SERVICE_CLIENT_SECRET,
	MAILING_SERVICE_REFRESH_TOKEN,
	OAUTH_PLAYGROUND
);

// send mail
const sendEmail2 = (to) => {
	oauth2Client.setCredentials({
		refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
	});

	const accessToken = oauth2Client.getAccessToken();
	const smtpTransport = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: SENDER_EMAIL_ADDRESS,
			clientId: MAILING_SERVICE_CLIENT_ID,
			clientSecret: MAILING_SERVICE_CLIENT_SECRET,
			refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
			accessToken,
		},
	});

	const mailOptions = {
		from: SENDER_EMAIL_ADDRESS,
		to: to,
		subject: "Validation email addres",
		html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Order Validated .</h2>
            <p>              your order is validated, it will be delivered in the next 48 hours.           </p>

            <p>                   thank you for  trust  us and welcome to home art.                         </p>     
            
            </div>
        `,
	};

	smtpTransport.sendMail(mailOptions, (err, infor) => {
		if (err) return err;
		return infor;
	});
};

module.exports = sendEmail2;
