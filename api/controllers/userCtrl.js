const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			if (email == "") {
				return res.status(400).json({ emailMsg: "Enter votre email." });
			}
			if (password == "") {
				return res.status(400).json({ passwordMsg: "Enter votre mot de passe." });
			}
			const user = await Users.findOne({ email });
			if (!user)
				return res.status(400).json({ emailMsg: "Ce email n'exist pas." });

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch)
				return res.status(400).json({ passwordMsg: "Mot de passe incorrect." });

			if (user.role === 0) {
				return res.status(400).json({ emailMsg: "Vous etes pas un admin." });
			}

			const refresh_token = createRefreshToken({ id: user._id });
			res.cookie("refreshtoken", refresh_token, {
				httpOnly: true,
				path: "/users/refresh_token",
				maxAge: 7*24*60*60*1000, //7 days
			});

			//const userInfo = await Users.findById(req.user.id).select("-password");

			res.json({ /*user: userInfo,*/ msg: "Login success!" });
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

	getUserInfo: async (req, res) => {
		try {
			const user = await Users.findById(req.user.id).select("-password");

			res.json(user);
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	getUsersAllInfo: async (req, res) => {
		try {
			const users = await Users.find().select("-password");

			res.json(users);
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

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

module.exports = userCtrl;
