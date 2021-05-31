const Users = require("../models/AdminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
	/**
	 * @route   POST /users/admin
	 * @desc    Login admin
	 * @access  Public
	 */
	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			if (email == "") {
				return res.status(400).json({ msg: "Enter votre email.", id: 0 });
			}
			if (password == "") {
				return res
					.status(400)
					.json({ msg: "Enter votre mot de passe.", id: 1 });
			}
			const user = await Users.findOne({ email });
			if (!user)
				return res.status(400).json({ msg: "Ce email n'exist pas.", id: 0 });

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch)
				return res.status(400).json({ msg: "Mot de passe incorrect.", id: 1 });

			if (user.role === 0) {
				return res.status(400).json({ msg: "Vous ètes pas un admin.", id: 0 });
			}

			const access_token = createAccessToken({ id: user._id });

			res.status(200).json({
				access_token,
			});
		} catch (err) {
			return res.status(400).json({ msg: err.message });
		}
	},

	/**
	 * @route   GET /users/load_admin
	 * @desc    Login admin
	 * @access  Public
	 */
	loadAdmin: async (req, res) => {
		try {
			const user = await Users.findById(req.user.id)
				.select("-password")
				.select("-register_date");
			if (!user) return res.status(400).json({ msg: "User does not exist." });
			if (user.role !== 1) {
				return res.status(400).json({ msg: "Vous etes pas un admin." });
			}
			res.status(200).json({
				user,
			});
		} catch (e) {
			res.status(400).json({ msg: e.message });
		}
	},
	getUsersAllInfo: async ( res) => {
		try {
			const users = await Users.find().select("-password");

			res.json(users);
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

const createAccessToken = (payload) => {
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: 86400, //1 day,
	});
};

module.exports = userCtrl;
