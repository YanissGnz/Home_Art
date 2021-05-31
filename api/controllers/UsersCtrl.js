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
            const {name , last_name, email, password,cf_password } = req.body
            
			if (name == "") {
				return res.status(400).json({ msg: "Enter votre nom.",id:2 });
			}
			if (!validateName(name)) {
				return res.status(400).json({ msg: "Invalid name",id:2 });
			}
			if (last_name == "") {
				return res.status(400).json({msg: "Enter votre prénom.",id:3 });
			}
			if (!validateLast_Name(last_name)) {
				return res.status(400).json({ msg: "Invalid last_name",id:3 });
			}
			if (email == "") {
				return res.status(400).json({ msg: "Enter votre email." ,id:0});
			}
			if (password == "") {
				return res.status(400).json({ msg: "Enter votre mot de passe.", id:1 });
			}
            if(!validateEmail(email))
                return res.status(400).json({msg: "Invalid email.",id:0})

            const user = await Users2.findOne({email})
            if(user) return res.status(400).json({msg: "This email already exists.",id:0})

            if(password.length < 6)
                return res.status(400).json({msg: "Password must be at least 6 characters.",id:1})

			if(!isMatch(password, cf_password))
			    return res.status(400).json({msg: "Password did not match.",id:4})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                name,last_name, email, password:passwordHash,cf_password: passwordHash
            }

            

            const access_token = createActivationToken(newUser)

            const url = `${CLIENT_URL}/users/activate/${access_token}`
			
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
				return res.status(400).json({ msg: "Enter votre email.", id: 0 });
			}
			if (password == "") {
				return res.status(400).json({ msg: "Enter votre mot de passe.", id: 1 });
			}
			const user = await Users2.findOne({ email });
			if (!user)
				return res.status(400).json({ msg: "Ce email n'exist pas.", id: 0 });

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch)
				return res.status(400).json({ msg: "Mot de passe incorrect.", id: 1 });

			if (user.role === 1) {
				return res.status(400).json({ msg: "Vous ètes pas un utilisateur.", id: 0 });
			}

			const access_token = createAccessToken({ id: user._id });

			res.status(200).json({
				access_token,
			});
		} catch (err) {
			return res.status(400).json({ msg: err.message });
		}
	},
	loadUser: async (req, res) => {
		try {
			const user = await Users2.findById(req.user.id)
				.select("-password")
				.select("-register_date");
			if (!user) return res.status(400).json({ msg: "User does not exist." });
			if (user.role !== 0) {
				return res.status(400).json({ msg: "Vous etes pas un utilisateur" });
			}
			res.status(200).json({
				user,
			});
		} catch (e) {
			res.status(400).json({ msg: e.message });
		}
	},

	getUserInfo: async (req, res) => {
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
	
			if(!email_verified) return res.status(400).json({msg: "Email verification failed.",id:0})
	
			const user = await Users2.findOne({email})
	
			if(user){
				const isMatch = await bcrypt.compare(password, user.password)
				if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})
	
				const access_token = createAccessToken({ id: user._id });

			res.status(200).json({
				access_token,
			});
			}else{
				const newUser = new Users2({
					name, email, password: passwordHash
				})
	
				await newUser.save()
				
				const access_token = createAccessToken({ id: newUser._id });

			res.status(200).json({
				access_token,
			});
			}
	
	
		} catch (err) {
			return res.status(400).json({msg: err.message})
		}
	},
};


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validateName(name) {
    const re =  /^[a-zA-Z ]*$/;
    return re.test(name);
}
function validateLast_Name(last_name) {
    const re =  /^[a-zA-Z ]*$/;
    return re.test(last_name);
}
function isMatch (password, cf_password)  {
    if(password === cf_password) return true
    return false
}


const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
}



const createAccessToken = (payload) => {
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "1h",
	});
};

module.exports = userCtrl2;