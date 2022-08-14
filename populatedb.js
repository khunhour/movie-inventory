#! /usr/bin/env node

console.log(
	"This script populates some test movies, directors, and genres to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Movie = require("./models/movie");
var Director = require("./models/director");
var Genre = require("./models/genre");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var directors = [];
var genres = [];
var movies = [];

function directorCreate(first_name, family_name, cb) {
	directordetail = { first_name: first_name, family_name: family_name };

	var director = new Director(directordetail);

	director.save(function (err) {
		if (err) {
			cb(err, null);
			return;
		}
		console.log("New Director: " + director);
		directors.push(director);
		cb(null, director);
	});
}

function genreCreate(name, cb) {
	var genre = new Genre({ name: name });

	genre.save(function (err) {
		if (err) {
			cb(err, null);
			return;
		}
		console.log("New Genre: " + genre);
		genres.push(genre);
		cb(null, genre);
	});
}

function movieCreate(
	title,
	director,
	genre,
	release_date,
	rating,
	description,
	img_url,
	cb
) {
	moviedetail = {
		title: title,
		director: director,
		release_date: release_date,
		rating: rating,
		description: description,
		img_url: img_url,
	};
	if (genre != false) moviedetail.genre = genre;

	var movie = new Movie(moviedetail);
	movie.save(function (err) {
		if (err) {
			cb(err, null);
			return;
		}
		console.log("New Movie: " + movie);
		movies.push(movie);
		cb(null, movie);
	});
}

function createGenreDirectors(cb) {
	async.series(
		[
			function (callback) {
				directorCreate("Zack", "Snyder", callback);
			},
			function (callback) {
				directorCreate("Wes", "Anderson", callback);
			},
			function (callback) {
				directorCreate("Woody", "Allen", callback);
			},
			function (callback) {
				directorCreate("Steven", "Spielberg", callback);
			},
			function (callback) {
				directorCreate("Martin", "Scorsese", callback);
			},
			function (callback) {
				genreCreate("Fantasy", callback);
			},
			function (callback) {
				genreCreate("Science Fiction", callback);
			},
			function (callback) {
				genreCreate("Horror", callback);
			},
		],
		// optional callback
		cb
	);
}

function createMovies(cb) {
	async.parallel(
		[
			function (callback) {
				movieCreate(
					"Zack Snyder's Justice League",
					directors[0],
					[genres[0]],
					"2021-03-18",
					8.3,
					"Determined to ensure Superman's ultimate sacrifice was not in vain, Bruce Wayne aligns forces with Diana Prince with plans to recruit a team of metahumans to protect the world from an approaching threat of catastrophic proportions. The task proves more difficult than Bruce imagined, as each of the recruits must face the demons of their own pasts to transcend that which has held them back, allowing them to come together, finally forming an unprecedented league of heroes. Now united, Batman, Wonder Woman, Aquaman, Cyborg and The Flash may be too late to save the planet from Steppenwolf, DeSaad and Darkseid and their dreadful intentions.",
					"https://upload.wikimedia.org/wikipedia/en/6/60/Zack_Snyder%27s_Justice_League.png",
					callback
				);
			},
			function (callback) {
				movieCreate(
					"The French Dispatch",
					directors[1],
					[genres[0]],
					"2021-10-22",
					7.5,
					"A love letter to journalists set in an outpost of an American newspaper in a fictional twentieth century French city that brings to life a collection of stories published in The French Dispatch Magazine.",
					"https://soap2day.ac/pic/movie/cover/aToxMjI2NDs.jpg",
					callback
				);
			},
			function (callback) {
				movieCreate(
					"A Rainy Day in New York",
					directors[2],
					[genres[1]],
					"2019-07-26",
					6.9,
					"A young couple arrive in New York for a weekend where they are met with bad weather and a series of adventures and misadventures.",
					"https://soap2day.ac/pic/movie/cover/aTo2NTAwOw.jpg",
					callback
				);
			},
			function (callback) {
				movieCreate(
					"West Side Story",
					directors[2],
					[genres[1]],
					"2021-12-10",
					7.8,
					"An adaptation of the 1957 musical, West Side Story explores forbidden love and the rivalry between the Jets and the Sharks, two teenage street gangs of different ethnic backgrounds.",
					"https://soap2day.ac/pic/movie/cover/aToxMjc4Nzs.jpg",
					callback
				);
			},
			function (callback) {
				movieCreate(
					"Test movie 1",
					directors[3],
					[genres[0], genres[1]],
					"2020-11-10",
					10,
					"sth sth",
					"fsdfjao",
					callback
				);
			},
		],
		// optional callback
		cb
	);
}

async.series(
	[createGenreDirectors, createMovies],
	// Optional callback
	function (err, results) {
		if (err) {
			console.log("FINAL ERR: " + err);
		}
		// All done, disconnect from database
		mongoose.connection.close();
	}
);
