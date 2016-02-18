module.exports = function (connection) {
    var mongoose = require('mongoose');

    var location = new mongoose.Schema({
		longitude	: Number,
		latitude	: Number,
		name		: String,
		points		: Number,
    });

    return connection.model('Location', location);
}