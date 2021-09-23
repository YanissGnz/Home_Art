const fs = require("fs");
function deleteImages(images) {
	try {
		images.forEach((image) => {
			fs.unlinkSync(`./${image}`);
		});
	} catch (e) {
		return e;
	}
}

module.exports = deleteImages;
