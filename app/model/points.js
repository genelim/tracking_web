module.exports = function (connection) {
    var mongoose = require('mongoose'),
       Schema = mongoose.Schema;

    var points = new mongoose.Schema({
		location : { type: Schema.Types.ObjectId, ref: 'Location' },
		date  	 : [Date]
    });

    return connection.model('Points', points);
}