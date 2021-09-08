const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
	name: {
		type: String,
		trim: true,
	},
	brand: {
		type: String,
		trim: true,
	},
	price: {
		type: Number,
	},
	oldPrice: {
		type: Number,
	},
	promoted: {
		type: Boolean,
	},
	stock: {
		type: Number,
	},
	categorie: {
		type: String,
	},
	subCategorie: {
		type: String,
	},
	description: {
		type: String,
	},
	productImages: {
		type: Array,
	},
	pack: {
		type: Boolean,
		default: false,
	},
	archived: {
		type: Boolean,
	},
	comments: {
		type: Array,
		default: [],
	},
	rating: {
		type: Array,
		default: [0, 0, 0, 0, 0],
	},
	ratingsNumber: {
		type: Number,
		default: 0,
	},
});

productSchema.index({
	"$**": "text",
});

module.exports = mongoose.model("Product", productSchema);
