const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const adminRoutes = require("./api/routes/userRouter");
const productRoutes = require("./api/routes/productRouter");
const giftCardRoutes = require("./api/routes/giftCardRouter");

//BodyParser Middleware
app.use(express.json());

//DB Config
const db = require("./config/database.json").localURL;

//Connect to Mongo
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log("MongoDB Connected..."))
	.catch((err) => console.log(err));

//Public Images
app.use(express.static("public"));

// For accepting post form data
app.use("/users", adminRoutes);
app.use("/products", productRoutes);
app.use("/gift_card", giftCardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
