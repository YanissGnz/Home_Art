const Users2 = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require('./sendMail')
const {google} = require('googleapis')
const {OAuth2} = google.auth
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const {CLIENT_URL} = process.env


const userCtrl2 = {
	register: async (req, res) => {
        try {
            const {name , last_name, email, password } = req.body
            
			if (name == "") {
				return res.status(400).json({ nameMsg: "Enter votre nom." });
			}
			if (last_name == "") {
				return res.status(400).json({ last_nameMsg: "Enter votre prénom." });
			}
			if (email == "") {
				return res.status(400).json({ emailMsg: "Enter votre email." });
			}
			if (password == "") {
				return res.status(400).json({ passwordMsg: "Enter votre mot de passe." });
			}
            if(!validateEmail(email))
                return res.status(400).json({emailMsg: "Invalid email."})

            const user = await Users2.findOne({email})
            if(user) return res.status(400).json({emailMsg: "This email already exists."})

            if(password.length < 6)
                return res.status(400).json({passwordMsg: "Password must be at least 6 characters."})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                name,last_name, email, password: passwordHash
            }

            

            const activation_token = createActivationToken(newUser)

            const url = `${CLIENT_URL}/users/activate/${activation_token}`
			
            sendEmail(email, url ,"Verify your email address")


            res.json({msg: "Register Success! Please activate your email to start."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    activateEmail: async (req, res) => {
        try {
            const {activation_token} = req.body
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            const {name,  email, password} = user

            const check = await Users2.findOne({email})
            if(check) return res.status(400).json({msg:"This email already exists."})

            const newUser = new Users2({
                name, email, password
            })

            await newUser.save()

            res.json({msg: "Account has been activated!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
	
	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			if (email == "") {
				return res.status(400).json({ emailMsg: "Enter votre email." });
			}
			if (password == "") {
				return res.status(400).json({ passwordMsg: "Enter votre mot de passe." });
			}
			const user = await Users2.findOne({ email });
			if (!user)
				return res.status(400).json({ emailMsg: "Ce email n'exist pas." });

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch)
				return res.status(400).json({ passwordMsg: "Mot de passe incorrect." });

			if (user.role === 1) {
				return res.status(400).json({ emailMsg: "Vous etes pas un utilisateur" });
			}

			const refresh_token = createRefreshToken({ id: user._id });
			res.cookie("refreshtoken", refresh_token, {
				httpOnly: true,
				path: "/users/refresh_token",
				maxAge: 7*24*60*60*1000, //7 days
			});

			res.json({ msg: "Login success!" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	getAccessToken: (req, res) => {
		try {
			const rf_token = req.cookies.refreshtoken;
			if (!rf_token) return res.status(400).json({ msg: "Please login now!" });

			jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
				if (err) return res.status(400).json({ msg: "Please login now!!!" });

				const access_token = createAccessToken({ id: user.id });
				res.json({ access_token });
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	getUserInfo2: async (req, res) => {
		try {
			const user = await Users2.findById(req.user.id).select("-password");

			res.json(user);
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	
	googleLogin: async (req, res) => {
		try {
			const {tokenId} = req.body
	
			const verify = await client.verifyIdToken({idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID})
			
			const {email_verified, email, name} = verify.payload
	
			const password = email + process.env.GOOGLE_SECRET
	
			const passwordHash = await bcrypt.hash(password, 12)
	
			if(!email_verified) return res.status(400).json({msg: "Email verification failed."})
	
			const user = await Users2.findOne({email})
	
			if(user){
				const isMatch = await bcrypt.compare(password, user.password)
				if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})
	
				const refresh_token = createRefreshToken({id: user._id})
				res.cookie('refreshtoken', refresh_token, {
					httpOnly: true,
					path: '/users/refresh_token',
					maxAge: 7*24*60*60*1000 // 7 days
				})
	
				res.json({msg: "Login success!"})
			}else{
				const newUser = new Users2({
					name, email, password: passwordHash
				})
	
				await newUser.save()
				
				const refresh_token = createRefreshToken({id: newUser._id})
				res.cookie('refreshtoken', refresh_token, {
					httpOnly: true,
					path: '/users/refresh_token',
					maxAge: 7*24*60*60*1000 // 7 days
				})
	
				res.json({msg: "Login success!"})
			}
	
	
		} catch (err) {
			return res.status(500).json({msg: err.message})
		}
	},
};


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
}

const createRefreshToken = (payload) => {
	return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "1h",
	});
};

const createAccessToken = (payload) => {
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "1h",
	});
};

module.exports = userCtrl2;