module.exports = function (connection) {
    var mongoose = require('mongoose');
       Schema = mongoose.Schema;

    var location = new mongoose.Schema({
		longitude	: Number,
		latitude	: Number,
		name		: String,
		points		: Number,
    });

    return connection.model('Location', location);
}