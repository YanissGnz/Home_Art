const Product = require("../models/ProductModel");
const Client = require("../models/userModel");
const fs = require("fs");
const deleteImages = require("../../client/public/uploads/DeleteImages");
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
			if (req.body.price == 0 || !req.body.price) {
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
			if (req.body.subCategorie == "") {
				return res
					.status(400)
					.json({ msg: "Enter la sous-categorie de produit.", id: 5 });
			}
			if (req.body.description == "") {
				return res
					.status(400)
					.json({ msg: "Enter une description sur produit.", id: 6 });
			}
			if (req.files.length == 0) {
				return res
					.status(400)
					.json({ msg: "Choisir des images pour le produit", id: 7 });
			} else {
				const productImages = [];
				for (var i = 0; i < req.files.length; i++) {
					productImages.push(req.files[i].originalname);
				}
				const newProduct = new Product({
					name: req.body.name,
					brand: req.body.brand,
					price: req.body.price,
					stock: req.body.stock,
					categorie: req.body.categorie,
					subCategorie: req.body.subCategorie,
					description: req.body.description,
					productImages: productImages,
					pack: req.body.pack,
					archived: false,
					promoted: false,
					newPrice: 0,
				});

				await newProduct.save();

				const Products = await Product.find().sort([["_id", "desc"]]);

				return res
					.status(200)
					.json({ Products, msg: "Le Produit a été ajouter" });
			}
		} catch (err) {
			console.log(err.message);
			return res.status(400).json({ msg: err.message });
		}
	},
	getProducts: async (req, res) => {
		const sortBy = req.body.sortBy ? req.body.sortBy : "_id";
		const order = req.body.sortBy ? req.body.sortBy : "desc";
		const limit = req.body.limit ? parseInt(req.body.limit) : 100;
		const skip = req.body.skip ? parseInt(req.body.skip) : 0;

		try {
			const Products = await Product.find()
				.skip(skip)
				.limit(limit)
				.sort([[sortBy, order]]);

			res.status(200).json({
				Products,
			});
		} catch (e) {
			res.status(400).json({ msg: e.message });
		}
	},
	getNewProducts: async (req, res) => {
		const sortBy = req.body.sortBy ? req.body.sortBy : "_id";
		const order = req.body.sortBy ? req.body.sortBy : "desc";
		const limit = req.body.limit ? parseInt(req.body.limit) : 100;
		const skip = req.body.skip ? parseInt(req.body.skip) : 0;

		try {
			const Products = await Product.find({ pack: false })
				.skip(skip)
				.limit(limit)
				.sort([[sortBy, order]]);

			res.status(200).json({
				Products,
			});
		} catch (e) {
			res.status(400).json({ msg: e.message });
		}
	},
	getPacks: async (req, res) => {
		const sortBy = req.body.sortBy ? req.body.sortBy : "_id";
		const order = req.body.sortBy ? req.body.sortBy : "desc";
		const limit = req.body.limit ? parseInt(req.body.limit) : 100;
		const skip = req.body.skip ? parseInt(req.body.skip) : 0;
		const categorie = req.body.categorie
			? req.body.categorie
			: [
					"Meuble",
					"Vaisselle",
					"Literie",
					"Décoration",
					"Electroménager",
					"Autre",
			  ];
		const price = req.body.priceRange
			? {
					$gte: req.body.priceRange[0],
					$lte: req.body.priceRange[1],
			  }
			: {
					$gte: 0,
					$lte: 9000000,
			  };
		const promoted = req.body.selectPromotion
			? req.body.selectPromotion
			: false;

		try {
			if (promoted) {
				const Packs = await Product.find({
					price,
					categorie,
					promoted,
					pack: true,
				})
					.skip(skip)
					.limit(limit);

				console.log(Packs);

				res.status(200).json({
					Packs,
				});
			} else {
				const Packs = await Product.find({
					price,
					categorie,
					pack: true,
				})
					.skip(skip)
					.limit(limit);

				res.status(200).json({
					Packs,
				});
			}
		} catch (e) {
			res.status(400).json({ msg: e.message });
		}
	},
	getProductById: async (req, res) => {
		let type = req.query.type;
		let product_id = req.query.id;
		try {
			const product = await Product.find({ _id: { $in: product_id } });

			res.status(200).json({
				product,
			});
		} catch (e) {
			res.status(400).json({ msg: e.message });
		}
	},
	getProductsByCategorie: async (req, res) => {
		let categorie = req.query.categorie;
		const limit = req.body.limit ? parseInt(req.body.limit) : 100;
		const skip = req.body.skip ? parseInt(req.body.skip) : 0;
		const subCategorie = req.body.checkedCategorie
			? req.body.checkedCategorie
			: null;
		const price = req.body.priceRange
			? {
					$gte: req.body.priceRange[0],
					$lte: req.body.priceRange[1],
			  }
			: {
					$gte: 0,
					$lte: 9000000,
			  };

		const promoted = req.body.selectPromotion
			? req.body.selectPromotion
			: false;

		try {
			if (subCategorie) {
				if (promoted) {
					const products = await Product.find({
						categorie,
						price,
						promoted,
						subCategorie,
						archived: false,
					})
						.skip(skip)
						.limit(limit)
						.select("-brand")
						.select("-comments")
						.select("-description")
						.select("-archived")
						.select("-__v");
					res.status(200).json({
						products,
					});
				} else {
					const products = await Product.find({
						categorie,
						price,
						subCategorie,
						archived: false,
					})
						.skip(skip)
						.limit(limit)
						.select("-brand")
						.select("-comments")
						.select("-description")
						.select("-archived")
						.select("-__v");
					res.status(200).json({
						products,
					});
				}
			} else {
				if (promoted) {
					const products = await Product.find({
						categorie,
						price,
						promoted,
						archived: false,
					})
						.skip(skip)
						.limit(limit)
						.select("-brand")
						.select("-comments")
						.select("-description")
						.select("-archived")
						.select("-__v");
					res.status(200).json({
						products,
					});
				} else {
					const products = await Product.find({
						categorie,
						price,
						pack: false,
						archived: false,
					})
						.skip(skip)
						.limit(limit)
						.select("-brand")
						.select("-comments")
						.select("-description")
						.select("-archived")
						.select("-__v");
					res.status(200).json({
						products,
					});
				}
			}
		} catch (e) {
			res.status(400).json({ msg: e.message });
		}
	},
	searchProduct: async (req, res) => {
		const searchTerm = req.query.searchTerm;

		const limit = req.body.limit ? parseInt(req.body.limit) : 100;
		const skip = req.body.skip ? parseInt(req.body.skip) : 0;
		const categorie = req.body.categorie
			? req.body.categorie
			: [
					"Meuble",
					"Vaisselle",
					"Literie",
					"Décoration",
					"Electroménager",
					"Autre",
			  ];
		const price = req.body.priceRange
			? {
					$gte: req.body.priceRange[0],
					$lte: req.body.priceRange[1],
			  }
			: {
					$gte: 0,
					$lte: 9000000,
			  };
		const promoted = req.body.selectPromotion
			? req.body.selectPromotion
			: false;

		try {
			if (promoted) {
				const products = await Product.find({
					$text: { $search: searchTerm },
				})
					.find({
						price,
						categorie,
						promoted,
						archived: false,
					})
					.skip(skip)
					.limit(limit);

				res.status(200).json({
					products,
				});
			} else {
				const products = await Product.find({
					$text: { $search: searchTerm },
				})
					.find({
						price,
						categorie,
						archived: false,
					})
					.skip(skip)
					.limit(limit);
				res.status(200).json({
					products,
				});
			}
		} catch (e) {
			res.status(400).json({ msg: e.message });
		}
	},
	getPromotedProducts: async (req, res) => {
		const limit = req.body.limit ? parseInt(req.body.limit) : 100;
		const skip = req.body.skip ? parseInt(req.body.skip) : 0;
		const categorie = req.body.categorie
			? req.body.categorie
			: [
					"Meuble",
					"Vaisselle",
					"Literie",
					"Décoration",
					"Electroménager",
					"Autre",
			  ];
		const price = req.body.priceRange
			? {
					$gte: req.body.priceRange[0],
					$lte: req.body.priceRange[1],
			  }
			: {
					$gte: 0,
					$lte: 9000000,
			  };

		try {
			const products = await Product.find({
				price,
				categorie,
				promoted: true,
				archived: false,
			})
				.skip(skip)
				.limit(limit);

			res.status(200).json({
				products,
			});
		} catch (e) {
			res.status(400).json({ msg: e.message });
		}
	},
	updateRating: async (req, res) => {
		let type = req.query.type;
		let product_id = req.query.id;
		const value = req.body.value;
		try {
			const product = await Product.findOne({ _id: { $in: product_id } });

			var rating = product.rating;

			rating[Math.ceil(value) - 1] = rating[Math.ceil(value) - 1] + 1;

			const newRatingNumber =
				rating[0] + rating[1] + rating[2] + rating[3] + rating[4];

			await Product.updateOne(
				{ _id: product_id },
				{
					rating: rating,
					ratingsNumber: newRatingNumber,
				}
			);

			res.status(200).json({
				rating,
				newRatingNumber,
			});
		} catch (e) {
			res.status(400).json({ msg: e.message });
		}
	},
	addComment: async (req, res) => {
		let type = req.query.type;
		let product_id = req.query.id;
		const comment = req.body.comment;
		const user_id = req.user.id;

		try {
			const user = await Client.findOne({ _id: user_id });

			const name = user.name + " " + user.last_name;
			const product = await Product.findOne({ _id: { $in: product_id } });
			var comments = product.comments;
			const newComment = {
				comment: comment,
				name: name,
			};
			comments.push(newComment);

			await Product.updateOne(
				{ _id: product_id },
				{
					comments: comments,
				}
			);

			res.status(200).json({
				newComment,
				msg: "Le commentaire a été ajouter",
			});
		} catch (e) {
			res.status(400).json({ msg: e.message });
		}
	},

	editProduct: async (req, res) => {
		const product_id = req.params.product_id;
		const {
			name,
			brand,
			price,
			stock,
			categorie,
			subCategorie,
			description,
			newPrice,
			promoted,
		} = req.body;

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
			if (subCategorie == "") {
				return res
					.status(400)
					.json({ msg: "Enter la sous-categorie de produit.", id: 5 });
			}
			if (description == "") {
				return res
					.status(400)
					.json({ msg: "Enter une description sur produit.", id: 6 });
			}
			const check = await Product.findOne({ _id: product_id });
			if (!check) {
				return res.status(400).json({ msg: "Produit n'exist pas.", id: 6 });
			}
			if (req.files.length == 0) {
				const editedProduct = await Product.updateOne(
					{ _id: product_id },
					{
						name,
						brand,
						price,
						stock,
						categorie,
						subCategorie,
						description,
						newPrice,
						promoted,
					}
				);
			} else {
				const productImages = [];

				for (var i = 0; i < req.files.length; i++) {
					productImages.push(req.files[i].originalname);
				}
				const editedProduct = await Product.updateOne(
					{ _id: product_id },
					{
						name,
						brand,
						price,
						stock,
						categorie,
						subCategorie,
						description,
						productImages,
						promoted,
						newPrice,
					}
				);
			}
			const Products = await Product.find().sort([["_id", "desc"]]);

			return res
				.status(200)
				.json({ Products, msg: "Le produit a été modifier" });
		} catch (e) {
			res.status(400).json({ msg: e.message });
		}
	},
	promoteProduct: async (req, res) => {
		const product_id = req.params.product_id;
		const { newPrice } = req.body;
		try {
			const product = await Product.findOne({ _id: product_id });
			if (!product) {
				return res.status(400).json({ msg: "Produit n'exist pas." });
			}
			if (newPrice === "" || newPrice === 0) {
				return res.status(400).json({ msg: "Enter le nouveau prix.", id: 6 });
			}
			const oldPrice = product.price;
			const archivedProduct = await Product.updateOne(
				{ _id: product_id },
				{ price: newPrice, oldPrice: oldPrice, promoted: true }
			);
			const Products = await Product.find().sort([["_id", "desc"]]);

			return res
				.status(200)
				.json({ Products, msg: "Le produit a été promoter" });
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
			await Product.updateOne({ _id: product_id }, { archived: true });
			const Products = await Product.find().sort([["_id", "desc"]]);

			return res
				.status(200)
				.json({ Products, msg: "Le produit a été archiver" });
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
			const Products = await Product.find().sort([["_id", "desc"]]);

			return res
				.status(200)
				.json({ Products, msg: "Le produit a été reveler" });
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
			deleteImages(check.productImages);

			await Product.deleteOne({ _id: product_id });

			const Products = await Product.find().sort([["_id", "desc"]]);

			return res.status(200).json({
				Products,
				msg: "Le produit a été supprimer",
			});
		} catch (err) {
			0;
			return res.status(400).json({ msg: err.message });
		}
	},
};

module.exports = productCtrl;
