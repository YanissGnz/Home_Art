const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: Number,
			default: 0, // 0 = user, 1 = admin
		},
		cart: {
			type: Array,
			default: [],
		},
		favoriteProducts: {
			type: Array,
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Users2", userSchema);
