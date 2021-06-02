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
const sendEmail = (to, url, txt) => {
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
		subject: "Validation Compte",
		html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Bienvenue sur Home Art .</h2>
            <p>Félicitations! Vous êtes presque prêt à commencer à utiliser Home Art.
                 Cliquez simplement sur le bouton ci-dessous pour valider votre adresse e-mail.
            </p>
            
            <a href=${url} style="background: #f58634; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>Si le bouton ne fonctionne pas pour une raison quelconque, vous pouvez également cliquer sur le lien ci-dessous:</p>
        
            <div>${url}</div>
            </div>
        `,
	};

	smtpTransport.sendMail(mailOptions, (err, infor) => {
		if (err) return err;
		return infor;
	});
};

module.exports = sendEmail;
