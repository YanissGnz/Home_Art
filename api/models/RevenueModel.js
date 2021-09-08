const mongoose = require("mongoose");

const revenueSchema = new mongoose.Schema({
	month: {
		type: Number,
		required: true,
	},
	year: {
		type: Number,
		required: true,
	},
	revenue: {
		type: Number,
		default: 0,
		required: true,
	},
});

module.exports = mongoose.model("Revenue", revenueSchema);
