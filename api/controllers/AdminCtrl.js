const Admins = require("../models/AdminModel");
const Clients = require("../models/userModel");
const Order = require("../models/OrderModel");
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
			const user = await Admins.findOne({ email });
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
			const user = await Admins.findById(req.user.id)
				.select("-password")
				.select("-register_date");
			if (!user)
				return res.status(400).json({ msg: "Utilisateur n'éxist pas." });
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
	getUsers: async (req, res) => {
		try {
			const users = await Clients.find()
				.select("-password")
				.sort({ createdAt: -1 });
			res.status(200).json({
				users,
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	getOrders: async (req, res) => {
		try {
			const orders = await Order.find();
			res.status(200).json({
				orders,
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	deleteUser: async (req, res) => {
		const user_Id = req.params.user_Id;
		try {
			const check = await Clients.findOne({ _id: user_Id });
			if (!check) {
				return res.status(400).json({ msg: "Utilisateur n'exist pas." });
			}
			await Clients.deleteOne({ _id: user_Id });
			res.json({ msg: "L'utilisateur a été supprimé" });
		} catch (err) {
			return res.status(400).json({ msg: err.message });
		}
	},
	validateOrder: async (req, res) => {
		const { user_id, order_id } = req.body;

		try {
			const validOrders = await Order.findOneAndUpdate(
				{ _id: { $in: order_id } },
				{ isValidated: true }
			);

			const orders = await Order.find();

			const user = await Clients.findOne({
				_id: { $in: user_id },
			})
				.select("orders")
				.select("notifications");

			const userOrders = user.orders;

			const newOrders = userOrders.filter((order) => order._id != order_id);
			newOrders.push(validOrders);

			var notifications = user.notifications;

			const notification = {
				value: `Votre commande a été valider, il sera livré sous 48h`,
				date: new Date(),
			};
			notifications.push(notification);

			const newUser = await Clients.findOneAndUpdate(
				{
					_id: { $in: user_id },
				},
				{
					orders: newOrders,
					notifications,
				}
			);

			res.status(200).json({ orders });
		} catch (err) {
			return res.status(400).json({ msg: err.message });
		}
	},
};

const createAccessToken = (payload) => {
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: 86400, //1 day,
	});
};

module.exports = userCtrl;
