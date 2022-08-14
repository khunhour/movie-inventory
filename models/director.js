let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let DirectorSchema = new Schema({
	first_name: { type: String, required: true, maxLength: 100 },
	family_name: { type: String, required: true, maxLength: 100 },
});

// Virtual for director's full name
DirectorSchema.virtual("name").get(function () {
	let fullname = "";
	if (this.first_name && this.family_name) {
		fullname = this.first_name + this.family_name;
	}
	return fullnames;
});

// Virtual for director's URL
DirectorSchema.virtual("url").get(function () {
	return "director/" + this._id;
});

// export model
module.exports = mongoose.model("Director", DirectorSchema);
