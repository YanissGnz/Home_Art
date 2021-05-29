const router = require("express").Router();
const ProductCtrl = require("../controllers/ProductCtrl");
const multer = require("multer");
const { post } = require("./userRouter");

//multer Configuration
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public");
	},
	filename: (req, file, cb) => {
		const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, "-")}`;
		cb(null, fileName);
	},
});
const upload = multer({ storage }).single("receipt");

router.post("/add_product", upload, ProductCtrl.addProduct);

module.exports = router;
