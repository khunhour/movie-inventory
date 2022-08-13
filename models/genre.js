let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let GenreSchema = new Schema({
	name: { type: String, minLength: 3, maxLength: 100 },
});

// Virtual for genre's URL
GenreSchema.virtual("url").get(function () {
	return "/genre/" + this._id;
});

// Export model
module.exports = mongoose.model("Genre", GenreSchema);
