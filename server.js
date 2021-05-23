const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require('./routes/user.routes.js');



const app = express();
//BodyParser Middleware
app.use(bodyParser.json());
;

// routes
app.use('/api/user', userRoutes);



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

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
