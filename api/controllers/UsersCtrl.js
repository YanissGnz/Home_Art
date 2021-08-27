const Users2 = require("../models/userModel");
const Product = require("../models/ProductModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("./sendMail");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);

const { CLIENT_URL } = process.env;

const userCtrl2 = {
	register: async (req, res) => {
		try {
			const { name, last_name, email, password, cf_password } = req.body;

			if (name == "") {
				return res.status(400).json({ msg: "Enter votre nom.", id: 2 });
			}
			if (!validateName(name)) {
				return res.status(400).json({ msg: "Invalid name", id: 2 });
			}
			if (last_name == "") {
				return res.status(400).json({ msg: "Enter votre prénom.", id: 3 });
			}
			if (!validateLast_Name(last_name)) {
				return res.status(400).json({ msg: "Invalid last_name", id: 3 });
			}
			if (email == "") {
				return res.status(400).json({ msg: "Enter votre email.", id: 0 });
			}
			if (password == "") {
				return res
					.status(400)
					.json({ msg: "Enter votre mot de passe.", id: 1 });
			}
			if (cf_password == "") {
				return res
					.status(400)
					.json({ msg: "Confirmer votre mot de passe.", id: 4 });
			}
			if (!validateEmail(email))
				return res.status(400).json({ msg: "Invalid email.", id: 0 });

			const user = await Users2.findOne({ email });
			if (user)
				return res
					.status(400)
					.json({ msg: "This email already exists.", id: 0 });

			if (password.length < 6)
				return res
					.status(400)
					.json({ msg: "Password must be at least 6 characters.", id: 1 });

			if (!isMatch(password, cf_password))
				return res.status(400).json({ msg: "Password did not match.", id: 4 });

			const passwordHash = await bcrypt.hash(password, 12);

			const newUser = {
				name,
				last_name,
				email,
				password: passwordHash,
				cf_password: passwordHash,
				dateOfBirth: null,
				phoneNumber: "",
				gender: "",
				addresses: [],
			};

			const access_token = createActivationToken(newUser);

			const url = `${CLIENT_URL}/users/activate/${access_token}`;

			sendEmail(email, url, "Verify your email address");

			res.json({
				msg: "Register Success! Please activate your email to start.",
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	activateEmail: async (req, res) => {
		try {
			const { activation_token } = req.body;
			const user = jwt.verify(
				activation_token,
				process.env.ACTIVATION_TOKEN_SECRET
			);

			const {
				name,
				last_name,
				email,
				password,
				dateOfBirth,
				phoneNumber,
				gender,
				addresses,
			} = user;

			const check = await Users2.findOne({ email });
			if (check)
				return res.status(400).json({ msg: "This email already exists." });

			const newUser = new Users2({
				name,
				last_name,
				email,
				password,
				dateOfBirth,
				phoneNumber,
				gender,
				addresses,
			});

			await newUser.save();

			res.json({ msg: "Le compte a été activer." });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

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
			const user = await Users2.findOne({ email });
			if (!user)
				return res.status(400).json({ msg: "Ce email n'exist pas.", id: 0 });

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch)
				return res.status(400).json({ msg: "Mot de passe incorrect.", id: 1 });

			if (user.role === 1) {
				return res
					.status(400)
					.json({ msg: "Vous ètes pas un utilisateur.", id: 0 });
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
	forgotPassword: async (req, res) => {
		try {
			const { email } = req.body;
			if (!validateEmail(email))
				return res.status(400).json({ msg: "Invalid Emails", id: 0 });
			const user = await Users2.findOne({ email });
			if (!user)
				return res
					.status(400)
					.json({ msg: "This email does not exist.", id: 0 });

			const access_token = createAccessToken({ id: user._id });
			const url = `${CLIENT_URL}/users/reset/${access_token}`;

			sendEmail(email, url, "Reset your password");
			res.json({
				msg: "Re-send the password, please check your email.",
				access_token,
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	recoverPassword: async (req, res) => {
		try {
			const { password, cf_password } = req.body;
			if (password == "") {
				return res
					.status(400)
					.json({ msg: "Enter un nouveau mot de passe.", id: 1 });
			}
			if (cf_password == "") {
				return res
					.status(400)
					.json({ msg: "Confirmer votre nouveau  mot de passe.", id: 4 });
			}
			if (password.length < 6)
				return res
					.status(400)
					.json({ msg: "Password must be at least 6 characters.", id: 1 });

			if (!isMatch(password, cf_password))
				return res.status(400).json({ msg: "Password did not match.", id: 4 });

			const passwordHash = await bcrypt.hash(password, 12);

			await Users2.findOneAndUpdate(
				{ _id: req.user.id },
				{
					password: passwordHash,
				}
			);

			res.json({ msg: "Password successfully changed!" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
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
	addToCart: async (req, res) => {
		let type = req.query.type;
		let product_id = req.query.id;
		const user_id = req.user.id;
		try {
			const user = await Users2.findById(req.user.id);
			if (!user) return res.status(400).json({ msg: "User does not exist." });
			const product = await Product.findOne({ _id: { $in: product_id } })
				.select("-rating")
				.select("-comments")
				.select("-ratingsNumber")
				.select("-description")
				.select("-archived")
				.select("-__v");

			var newCart = user.cart;
			var found = false;
			var quantity;
			newCart.forEach((item) => {
				if (item.product._id.toString() === product._id.toString()) {
					found = true;
					item.quantity = item.quantity + 1;
					quantity = item.quantity;
				}
			});

			if (!found) {
				const newProduct = {
					product: product,
					quantity: 1,
				};
				newCart.push(newProduct);
			}
			const newUser = await Users2.findOneAndUpdate(
				{ _id: req.user.id },
				{
					cart: newCart,
				}
			);
			if (found) {
				return res
					.status(200)
					.json({ msg: "La quantity de produit a été incrémenter.", quantity });
			} else {
				return res.json({ newCart, newUser, msg: "Le produit a été ajouter." });
			}
		} catch (err) {
			return res.status(400).json({ msg: err.message });
		}
	},
	reduceQuantity: async (req, res) => {
		let type = req.query.type;
		let product_id = req.query.id;
		const user_id = req.user.id;
		try {
			const user = await Users2.findById(req.user.id);
			if (!user) return res.status(400).json({ msg: "User does not exist." });

			var newCart = user.cart;

			var found = false;
			var quantity;

			newCart.forEach((item) => {
				if (item.product._id.toString() === product_id && item.quantity > 1) {
					found = true;
					item.quantity = item.quantity - 1;
					quantity = item.quantity;
				}
			});

			const newUser = await Users2.findOneAndUpdate(
				{ _id: req.user.id },
				{
					cart: newCart,
				}
			);
			if (found) {
				return res.status(200).json(quantity);
			} else {
				return res.status(200).json(quantity);
			}
		} catch (err) {
			return res.status(400).json({ msg: err.message });
		}
	},
	removeItem: async (req, res) => {
		const user_id = req.user.id;
		const item = req.body.item;
		try {
			const user = await Users2.findById(req.user.id);
			if (!user) return res.status(404).json({ msg: "User does not exist." });
			const cart = user.cart;
			console.log(cart);
			console.log(item.product._id);

			const newCart = cart.filter(
				(product) => product.product._id != item.product._id
			);
			console.log(newCart);

			const newUser = await Users2.findOneAndUpdate(
				{ _id: req.user.id },
				{
					cart: newCart,
				}
			);

			return res.json({ newCart, msg: "Le produit a été retirer." });
		} catch (err) {
			return res.status(400).json({ msg: err.message });
		}
	},
	googleLogin: async (req, res) => {
		try {
			const { tokenId } = req.body;

			const verify = await client.verifyIdToken({
				idToken: tokenId,
				audience: process.env.MAILING_SERVICE_CLIENT_ID,
			});

			const { email_verified, email, name } = verify.payload;

			const password = email + process.env.GOOGLE_SECRET;

			const passwordHash = await bcrypt.hash(password, 12);

			if (!email_verified)
				return res
					.status(400)
					.json({ msg: "Email verification failed.", id: 0 });

			const user = await Users2.findOne({ email });

			if (user) {
				const isMatch = await bcrypt.compare(password, user.password);
				if (!isMatch)
					return res.status(400).json({ msg: "Password is incorrect." });

				const access_token = createAccessToken({ id: user._id });

				res.status(200).json({
					access_token,
				});
			} else {
				const newUser = new Users2({
					name,
					last_name: name,
					email,
					addresses: [],
					password: passwordHash,
					dateOfBirth: null,
					phoneNumber: "",
					gender: "",
				});

				await newUser.save();

				const access_token = createAccessToken({ id: newUser._id });

				res.status(200).json({
					access_token,
				});
			}
		} catch (err) {
			return res.status(400).json({ msg: err.message });
		}
	},
	addToFavorite: async (req, res) => {
		try {
			const user_Id = req.user.id;
			const product_id = req.params.product_Id;
			var user = await Users2.findOne({ _id: user_Id });
			var favoriteProducts = user.favoriteProducts;
			if (favoriteProducts.indexOf(product_id) === -1) {
				favoriteProducts.push(product_id);
			}
			user = await Users2.updateOne({ _id: user_Id }, { favoriteProducts });
			return res.status(200).json({ msg: "Ajouter aux favoris" });
		} catch (e) {
			res.status(400).json({ msg: e.message });
		}
	},
	removeFromFavorite: async (req, res) => {
		try {
			const user_Id = req.user.id;
			const product_id = req.params.product_Id;
			var user = await Users2.findOne({ _id: user_Id });
			var favoriteProducts = user.favoriteProducts;
			if (favoriteProducts.indexOf(product_id) !== -1) {
				favoriteProducts.splice(favoriteProducts.indexOf(product_id), 1);
			}
			user = await Users2.updateOne({ _id: user_Id }, { favoriteProducts });
			return res
				.status(200)
				.json({ favoriteProducts, msg: "Supprimer des favoris" });
		} catch (e) {
			res.status(400).json({ msg: e.message });
		}
	},
	editProfile: async (req, res) => {
		const user_id = req.user.id;
		const { name, last_name, dateOfBirth, phoneNumber, gender } = req.body;
		try {
			if (name === "") {
				return res.status(400).json({ msg: "Enter votre nom.", id: 0 });
			}
			if (last_name == "") {
				return res
					.status(400)
					.json({ msg: "Enter votre nom de famille.", id: 1 });
			}

			const check = await Users2.findOne({ _id: user_id });
			if (!check) {
				return res.status(400).json({ msg: "client n'exist pas.", id: 5 });
			}

			const editedProfile = await Users2.updateOne(
				{ _id: user_id },
				{
					name,
					last_name,
					dateOfBirth,
					phoneNumber,
					gender,
				}
			);

			return res.status(200).json({
				editedProfile,
				msg: "Vous information ont été modifier.",
			});
		} catch (e) {
			res.status(400).json({ msg: e.message });
		}
	},
	addAddress: async (req, res) => {
		const user_id = req.user.id;
		const { address, ville, region } = req.body;

		try {
			if (address === "") {
				return res.status(400).json({ msg: "Enter votre address.", id: 0 });
			}
			if (region === "") {
				return res.status(400).json({ msg: "Enter votre région.", id: 1 });
			}
			if (ville === "") {
				return res.status(400).json({ msg: "Enter votre ville.", id: 2 });
			}

			const user = await Users2.findOne({ _id: user_id });
			var addresses = user.addresses;

			console.log(user.addresses);

			const newAddress = {
				address: address,
				ville: ville,
				region: region,
			};
			addresses.push({
				address: address,
				ville: ville,
				region: region,
			});
			console.log(addresses);
			await Users2.updateOne(
				{ _id: user_id },
				{
					addresses: addresses,
				}
			);
			res.status(200).json({
				addresses,
				msg: "L'address à été ajouter.",
			});
		} catch (e) {
			res.status(404).json({ msg: e.message });
		}
	},
	retirerAddress: async (req, res) => {
		const user_id = req.user.id;
		const address = req.body.address;

		try {
			const user = await Users2.findById(req.user.id);
			if (!user) return res.status(404).json({ msg: "User does not exist." });
			var addresses = user.addresses;

			const newAddresses = addresses.filter(
				(item) =>
					item.address != address.address &&
					item.ville != address.ville &&
					item.region != address.region
			);

			const newUser = await Users2.findOneAndUpdate(
				{ _id: req.user.id },
				{
					addresses: newAddresses,
				}
			);
			return res.json({
				newAddresses,
				msg: "L'addresse' a été supprimer.",
			});
		} catch (err) {
			return res.status(400).json({ msg: err.message });
		}
	},
	resetPassword: async (req, res) => {
		const user_id = req.user.id;
		const { password, newPassword, confirmPassword } = req.body;
		try {
			if (password == "") {
				res.status(400).json({
					msg: "Entrer votre mot de passe",
					id: 0,
				});
			}
			if (newPassword === "") {
				res.status(400).json({
					msg: "Entrer votre nouveau mot de passe",
					id: 1,
				});
			}
			if (newPassword.length < 6) {
				res.status(400).json({
					msg: "Le mot de passe doit être au moins de 6 caractères",
					id: 1,
				});
			}
			if (confirmPassword === "") {
				res.status(400).json({
					msg: "Confirmer votre mot de passe",
					id: 2,
				});
			}
			if (!isMatch(newPassword, confirmPassword)) {
				res.status(400).json({
					msg: "Le nouveau mot de passe ne correspond pas",
					id: 2,
				});
			}
			const user = await Users2.findOne({ _id: user_id });
			const matchPassword = await bcrypt.compare(password, user.password);
			if (!matchPassword)
				return res.status(400).json({ msg: "Password is incorrect.", id: 0 });

			const passwordHash = await bcrypt.hash(newPassword, 12);

			await Users2.findOneAndUpdate(
				{ _id: req.user.id },
				{
					password: passwordHash,
				}
			);

			res.status(200).json({ msg: "Le mot de passe a été changer" });
		} catch (err) {
			return res.status(400).json({ msg: err.message });
		}
	},
};
function validateEmail(email) {
	const re =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}
function validateName(name) {
	const re = /^[a-zA-Z ]*$/;
	return re.test(name);
}
function validateLast_Name(last_name) {
	const re = /^[a-zA-Z ]*$/;
	return re.test(last_name);
}
function isMatch(password, cf_password) {
	if (password === cf_password) return true;
	return false;
}

const createActivationToken = (payload) => {
	return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
		expiresIn: "5m",
	});
};

const createAccessToken = (payload) => {
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "1h",
	});
};

module.exports = userCtrl2;
