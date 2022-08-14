let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let MovieSchema = new Schema({
	title: { type: String, required: true },
	director: { type: Schema.Types.ObjectId, ref: "Director", required: true },
	genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
	release_date: { type: Date },
	rating: { type: Number },
	description: { type: String },
	img_url: { type: String },
});

// Virtual for movie's URL
MovieSchema.virtual("url").get(function () {
	return "/movie/" + this._id;
});

// Export model
module.exports = mongoose.model("Movie", MovieSchema);
