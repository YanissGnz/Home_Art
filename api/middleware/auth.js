const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
	const token = req.header("x-auth-token");

	//Check for token
	if (!token) return res.status(400).json({ msg: "Authentication Invalid ." });

	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		// Add user from payload
		req.user = decoded;
		next();
	} catch (e) {
		res.status(400).json({
			msg: "Token n'est pas valid",
		});
	}
};

module.exports = auth;
