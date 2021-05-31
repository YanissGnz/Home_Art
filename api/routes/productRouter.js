const router = require("express").Router();
const ProductCtrl = require("../controllers/ProductCtrl");
const multer = require("multer");
const auth = require("../middleware/auth");
const { post } = require("./userRouter");

//multer Configuration
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public");
	},
	filename: (req, file, cb) => {
		const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, "-")}`;
		file.originalname = fileName;
		cb(null, file.originalname);
	},
});
const upload = multer({ storage }).single("receipt");

router.post("/add_product", upload, ProductCtrl.addProduct);

module.exports = router;
