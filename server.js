const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(cookieParser())
const adminRoutes = require("./api/routes/userRouter");



//BodyParser Middleware
app.use(bodyParser.json());

//DB Config
const db = require("./config/database.json").mongoURL;

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

// For accepting post form data
app.use("/users", adminRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));