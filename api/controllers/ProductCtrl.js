const Product = require("../models/ProductModel");
const fs = require("fs");

const productCtrl = {
	addProduct: async (req, res) => {
		try {
			if (req.body.name == "") {
				return res.status(400).json({ msg: "Enter le nom de produit.", id: 0 });
			}
			if (req.body.brand == "") {
				return res
					.status(400)
					.json({ msg: "Enter la marque de produit.", id: 1 });
			}
			if (req.body.price == "") {
				return res
					.status(400)
					.json({ msg: "Enter le prix de produit.", id: 2 });
			}
			if (req.body.stock == 0) {
				return res
					.status(400)
					.json({ msg: "Enter le stock de produit.", id: 3 });
			}
			if (req.body.categorie == "") {
				return res
					.status(400)
					.json({ msg: "Enter la categorie de produit.", id: 4 });
			}
			if (req.body.description == "") {
				return res
					.status(400)
					.json({ msg: "Enter une description sur produit.", id: 5 });
			}
			if (req.file == null) {
				return res
					.status(400)
					.json({ msg: "Choisir une image pour le produit", id: 6 });
			} else {
				const newProduct = new Product({
					name: req.body.name,
					brand: req.body.brand,
					price: req.body.price,
					stock: req.body.stock,
					categorie: req.body.categorie,
					description: req.body.description,
					productImage: req.file.originalname,
					archived: false,
				});

				newProduct
					.save()
					.then(() =>
						res.status(200).json({
							msg: "Le produit a été ajouté.",
						})
					)
					.catch((err) => res.status(400).json({ msg: err }));
			}
		} catch (err) {
			console.log(err.message);
			return res.status(400).json({ msg: err.message });
		}
	},
	getProducts: async (req, res) => {
		try {
			const Products = await Product.find().sort({ categorie: 1 });

			res.status(200).json({
				Products,
			});
		} catch (e) {
			res.status(400).json({ msg: e.message });
		}
	},
	editProduct: async (req, res) => {
		const product_id = req.params.product_id;
		const { name, brand, price, stock, categorie, description } = req.body;

		try {
			if (name == "") {
				return res.status(400).json({ msg: "Enter le nom de produit.", id: 0 });
			}
			if (brand == "") {
				return res
					.status(400)
					.json({ msg: "Enter la marque de produit.", id: 1 });
			}
			if (price == "") {
				return res
					.status(400)
					.json({ msg: "Enter le prix de produit.", id: 2 });
			}
			if (stock == 0) {
				return res
					.status(400)
					.json({ msg: "Enter le stock de produit.", id: 3 });
			}
			if (categorie == "") {
				return res
					.status(400)
					.json({ msg: "Enter la categorie de produit.", id: 4 });
			}
			if (description == "") {
				return res
					.status(400)
					.json({ msg: "Enter une description sur produit.", id: 5 });
			}
			const check = await Product.findOne({ _id: product_id });
			if (!check) {
				return res.status(400).json({ msg: "Produit n'exist pas.", id: 5 });
			}
			if (req.file == null) {
				const editedProduct = await Product.updateOne(
					{ _id: product_id },
					{ name, brand, price, stock, categorie, description }
				);
			} else {
				const productImage = req.file.originalname;
				const editedProduct = await Product.updateOne(
					{ _id: product_id },
					{ name, brand, price, stock, categorie, description, productImage }
				);
			}
			return res.status(200).json({
				msg: "Le produit a été modifier.",
			});
		} catch (e) {
			res.status(400).json({ msg: e.message });
		}
	},
	archiveProduct: async (req, res) => {
		const product_id = req.params.product_id;
		try {
			const check = await Product.findOne({ _id: product_id });
			if (!check) {
				return res.status(400).json({ msg: "Produit n'exist pas." });
			}
			const archivedProduct = await Product.updateOne(
				{ _id: product_id },
				{ archived: true }
			);
			return res.status(200).json({
				msg: "Le produit a été archiver.",
			});
		} catch (e) {
			res.status(400).json({ msg: e.message });
		}
	},
	revealProduct: async (req, res) => {
		const product_id = req.params.product_id;
		try {
			const check = await Product.findOne({ _id: product_id });
			if (!check) {
				return res.status(400).json({ msg: "Produit n'exist pas." });
			}
			const archivedProduct = await Product.updateOne(
				{ _id: product_id },
				{ archived: false }
			);
			return res.status(200).json({
				msg: "Le produit a été révéler.",
			});
		} catch (e) {
			res.status(400).json({ msg: e.message });
		}
	},
	deleteProduct: async (req, res) => {
		const product_id = req.params.product_id;
		try {
			const check = await Product.findOne({ _id: product_id });
			if (!check) {
				return res.status(400).json({ msg: "Produit n'exist pas." });
			}
			await Product.deleteOne({ _id: product_id });
			res.json({ msg: "le produit a été supprimé" });
		} catch (err) {
			return res.status(400).json({ msg: err.message });
		}
	},
};

module.exports = productCtrl;
