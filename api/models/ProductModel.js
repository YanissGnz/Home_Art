const { Double } = require("mongodb");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Entrer le nom de produit"],
		trim: true,
	},
	brand: {
		type: String,
		required: [true, "Entrer la marque de produit"],
		trim: true,
	},
	price: {
		type: String,
		required: [true, "Entrer le prix de produit"],
		trim: true,
	},
	stock: {
		type: Number,
		required: [true, "Entrer le nombre de stock"],
		trim: true,
	},
	categorie: {
		type: String,
		required: [true, "Choisir la categorie"],
		trim: true,
	},
	description: {
		type: String,
		required: [true, "Entrer un description"],
		trim: true,
	},
	productImages: {
		type: Array,
		required: [true, "Ajouter une image"],
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
		default: [1, 1, 1, 1, 1],
	},
	ratingsNumber: {
		type: Number,
		default: 1,
	},
});

module.exports = mongoose.model("Product", productSchema);
