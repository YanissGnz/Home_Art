const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		last_name: {
			type: String,
			required: true,
			trim: true,
		},
		phoneNumber: {
			type: String,
		},
		gender: {
			type: String,
			enum: [, "", "male", "female"],
		},
		dateOfBirth: {
			type: Date,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		addresses: { type: Array, default: [] },
		password: {
			type: String,
			required: true,
		},
		cart: {
			type: Array,
			default: [],
		},
		role: {
			type: Number,
			default: 0, // 0 = user, 1 = admin
		},
		favoriteProducts: {
			type: Array,
			default: [],
		},
		notifications: [
			{
				value: { type: String },
				date: { type: String },
			},
		],
		orders: {
			type: Array,
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Users2", userSchema);
