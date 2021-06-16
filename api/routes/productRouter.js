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
const upload = multer({ storage }).array("productImage", 6);

router.post("/add_product", auth, upload, ProductCtrl.addProduct);
router.post("/get_products", ProductCtrl.getProducts);
router.post("/get_products_names", ProductCtrl.getProductNames);
router.get("/get_product_by_id/", ProductCtrl.getProductById);
router.get("/get_products_by_categorie/", ProductCtrl.getProductsByCategorie);
router.put("/edit_product/:product_id", auth, upload, ProductCtrl.editProduct);
router.put("/archive_product/:product_id", auth, ProductCtrl.archiveProduct);
router.put("/reveal_product/:product_id", auth, ProductCtrl.revealProduct);
router.post("/update_rating", auth, ProductCtrl.updateRating);
router.post("/add_comment", auth, ProductCtrl.addComment);
router.delete("/delete_product/:product_id", auth, ProductCtrl.deleteProduct);

module.exports = router;
