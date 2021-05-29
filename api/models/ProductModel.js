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
	receipt: {
		type: String,
		required: [true, "Ajouter une image"],
	},
});

module.exports = mongoose.model("Product", productSchema);
