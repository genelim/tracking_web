module.exports = function (connection) {
    var mongoose = require('mongoose'),
       Schema = mongoose.Schema;

    var contribution = new mongoose.Schema({
		name  : { type: Schema.Types.ObjectId, ref: 'User' },
        points: [Points]
    });

    return connection.model('Contribution', contribution);
}