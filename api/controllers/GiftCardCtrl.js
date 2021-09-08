const { isValid } = require("shortid");
const GiftCard = require("../models/GiftCardModal");

const productCtrl = {
	addGiftCard: async (req, res) => {
		try {
			if (req.body.code == "") {
				return res.status(400).json({ msg: "Enter le code de carte", id: 0 });
			}
			if (req.body.budget === null && req.body.budget === 0) {
				return res
					.status(400)
					.json({ msg: "Entrer le budget de carte cadeau", id: 1 });
			} else {
				const newGiftCard = new GiftCard({
					code: req.body.code,
					budget: req.body.budget,
				});

				newGiftCard
					.save()
					.then(() =>
						res.status(200).json({
							msg: "Le carte cadeau a été ajouté.",
						})
					)
					.catch((err) => res.status(400).json({ msg: err }));
			}
		} catch (err) {
			return res.status(400).json({ msg: err.message });
		}
	},
	getGiftCards: async (req, res) => {
		try {
			const giftCards = await GiftCard.find();

			res.status(200).json({
				giftCards,
			});
		} catch (e) {
			res.status(400).json({ msg: e.message });
		}
	},
	verifyGiftCard: async (req, res) => {
		try {
			const { giftCardCode, totalPrice } = req.body;
			const giftCard = await GiftCard.findOne({ code: giftCardCode });

			if (giftCard) {
				if (giftCard.budget < parseInt(totalPrice)) {
					res.status(200).json({
						isValid: false,
						msg: {
							id: 0,
							msg: "Le budget de cette carte est insuffisant",
						},
					});
				} else {
					res.status(200).json({
						isValid: true,
						msg: {},
					});
				}
			} else {
				res.status(200).json({
					isValid: false,
					msg: { id: 0, msg: "Ce code n'est pas valid" },
				});
			}
		} catch (e) {
			res.status(400).json({ msg: e.message });
		}
	},
	deleteGiftCard: async (req, res) => {
		const giftCardId = req.params.giftCardId;
		try {
			const check = await GiftCard.findOne({ _id: giftCardId });
			if (!check) {
				return res.status(400).json({ msg: "Carte cadeau n'exist pas." });
			}
			await GiftCard.deleteOne({ _id: giftCardId });
			res.json({ msg: "Carte cadeau a été supprimé" });
		} catch (err) {
			return res.status(400).json({ msg: err.message });
		}
	},
};

module.exports = productCtrl;
