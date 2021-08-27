const mongoose = require("mongoose");

const giftCardSchema = new mongoose.Schema({
	code: {
		type: String,
		required: true,
	},
	budget: {
		type: Number,
		required: true,
	},
	expiry: {
		type: Date,
	},
});

module.exports = mongoose.model("GiftCard", giftCardSchema);
