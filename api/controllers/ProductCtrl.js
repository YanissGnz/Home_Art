const Product = require("../models/ProductModel");

const productCtrl = {
	addProduct: async (req, res) => {
		try {
			const newProduct = new Product({
				name: req.body.name,
				brand: req.body.brand,
				price: req.body.price,
				stock: req.body.stock,
				categorie: req.body.categorie,
				description: req.body.description,
				receipt: req.file.path,
			});
			if (newProduct.name == "") {
				return res.status(400).json({ emailMsg: "Enter le nom de produit." });
			}
			newProduct
				.save()
				.then(() =>
					res.status(200).json({
						msg: "Le produit a été ajouté.",
						product: newProduct,
					})
				)
				.catch((err) => res.status(400).json({ msg: err }));
		} catch (err) {
			return res.status(400).json({ msg: err.message });
		}
	},
};

module.exports = productCtrl;
