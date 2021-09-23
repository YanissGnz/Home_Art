const router = require("express").Router();
const GiftCardCtrl = require("../controllers/GiftCardCtrl");
const auth = require("../middleware/auth");

router.post("/add_gift_card", auth, GiftCardCtrl.addGiftCard);
router.get("/get_gift_Cards/", auth, GiftCardCtrl.getGiftCards);
router.post("/verify_gift_card", GiftCardCtrl.verifyGiftCard);
router.delete(
	"/delete_gift_card/:giftCardId",
	auth,
	GiftCardCtrl.deleteGiftCard
);

module.exports = router;
