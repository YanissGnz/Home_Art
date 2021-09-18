const GiftCard = require("../models/GiftCardModal");

const GiftCardCtrl = {
	addGiftCard: async (req, res) => {
		try {
			if (!req.body.code || req.body.code == "") {
				return res
					.status(400)
					.json({ msg: { msg: "Enter le code de carte", id: 0 } });
			} else if (req.body.code.length < 12) {
				return res
					.status(400)
					.json({ msg: { msg: "Le code doit ètre 12 caractère", id: 0 } });
			} else if (!req.body.budget || req.body.budget == 0) {
				return res
					.status(400)
					.json({ msg: { msg: "Entrer le budget de carte cadeau", id: 1 } });
			} else {
				const newGiftCard = new GiftCard({
					code:
						req.body.code.substring(0, 4) +
						" " +
						req.body.code.substring(4, 8) +
						" " +
						req.body.code.substring(8, 12) +
						" " +
						req.body.code.substring(12, 16),
					budget: req.body.budget,
				});

				await newGiftCard.save();

				const giftCards = await GiftCard.find();

				return res.status(200).json({
					giftCards,
					msg: "Le carte cadeau a été ajouté.",
				});
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
			const giftCards = await GiftCard.find();
			res.json({
				giftCards,
				msg: { msg: "Carte cadeau a été supprimé", id: 3 },
			});
		} catch (err) {
			return res.status(400).json({ msg: err.message });
		}
	},
};

module.exports = GiftCardCtrl;
