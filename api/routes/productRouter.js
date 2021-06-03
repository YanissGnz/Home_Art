const router = require("express").Router();
const ProductCtrl = require("../controllers/ProductCtrl");
const multer = require("multer");
const auth = require("../middleware/auth");
const { post } = require("./userRouter");

//multer Configuration
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./client/public/uploads");
	},
	filename: (req, file, cb) => {
		const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, "-")}`;
		file.originalname = fileName;
		cb(null, file.originalname);
	},
});
const upload = multer({ storage }).single("productImage");

router.post("/add_product", auth, upload, ProductCtrl.addProduct);
router.get("/get_products", ProductCtrl.getProducts);
router.put("/edit_product/:product_id", auth, upload, ProductCtrl.editProduct);
router.put("/archive_product/:product_id", auth, ProductCtrl.archiveProduct);
router.put("/reveal_product/:product_id", auth, ProductCtrl.revealProduct);

router.delete("/delete_product/:product_id", auth, ProductCtrl.deleteProduct);

module.exports = router;
