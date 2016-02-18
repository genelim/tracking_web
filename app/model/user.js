module.exports = function (connection) {
    var mongoose = require('mongoose');
       Schema = mongoose.Schema;

    var user = new mongoose.Schema({
		name	: String
    });

    return connection.model('User', user);
}