const { Double, ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const OrderModel = new mongoose.Schema({
	user: {
		id: ObjectId,
		name: { type: String },
		last_name: { type: String },
		phoneNumber: { type: String },
	},
	products: { type: Array, default: [] },
	totalPrice: { type: Number, default: 0 },
	deliveryPrice: { type: Number, default: 600 },
	deliveryAddress: { address: String, region: String, ville: String },
	paymentMethod: { type: String },
	paymentInfo: { type: Object, default: {} },
	paymentResult: { id: String, status: String, updateTime: String },
	isValidated: { type: Boolean, default: false },
	isPaid: { type: Boolean, default: false },
	paidAt: { type: Date },
	isDelivered: { type: Boolean, default: false },
	date: { type: String, required: true },
});

module.exports = mongoose.model("Order", OrderModel);
