const mongoose = require("mongoose")

var User = mongoose.Schema({
	discordID: {
		type: String,
        required: true,
	},
	discordToken: {
		type: String,
		required: true,
	},
	discordRefreshToken: {
		type: String,
		required: true,
	},
	songs: {
		type: Array,
		required: false,
	},
	spotifyID: {
		type: String,
		required: false,
	},
})

module.exports = mongoose.model("User", User)
