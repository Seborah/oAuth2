const DiscordStrategy = require("passport-discord").Strategy
const SpotifyStrategy = require("passport-spotify").Strategy

const passport = require("passport")

var auth = require("./auth.json")

var mongoose = require("mongoose")
mongoose.connect(auth.mongoURI, {})
var User = require("./Models/User")
passport.use(
	new DiscordStrategy(auth.discord, async function (accessToken, refreshToken, profile, cb) {
		var apple = await new User({
			discordID: profile.id,
			discordToken: accessToken,
			discordRefreshToken: refreshToken,
			songs: [],
			spotifyID: null,
        })
        apple.save()
		return cb(null, profile)
	})
)

var express = require("express")
var app = new express()

app.use(require("cookie-parser")())
app.use(require("body-parser").urlencoded({ extended: true }))
app.use(require("express-session")({ secret: "Sakura", resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.get("/auth/discord", passport.authenticate("discord"))
app.get(
	"/auth/discord/callback",
	passport.authenticate("discord", {
		failureRedirect: "/",
	}),
	function (req, res) {
		res.redirect("/home") // Successful auth
	}
)
app.get("/home", function (req, res) {
	res.send("You are logged in")
})

app.listen(3000)
