var mongoose = require('mongoose'),
    db = mongoose.createConnection('mongodb://127.0.0.1/tracking_web'),
    Location = require('../models/location.js')(db);

exports.add = function (req, res) {
    //create location instant to save
    var newLocation = new Location();
    newLocation.longitude = req.body.lng;
    newLocation.latitude = req.body.lat;
    newLocation.name = req.body.name;
    newLocation.points = req.body.points
    
    Location.findOne({latitude:req.body.lat,longitude:req.body.lng})
        .exec(function(err,location){
            if(err){
                res.json({response:"Server Error"}); 
            }else if(!location){
                newLocation.save(function(err, result){
                    if(err){
                        res.json({response:"Server Error"}); 
                        return;
                    }else{
                        res.json({response:result});
                    }
                })
            }else{
                res.json({response:"Location Existed"});
            }
        })
}

exports.get = function (req, res){
    Location.find()
        .exec(function(err, location){
            if(err){
                res.json({response:"Server Error"}); 
            }else{
                res.json({response: location});
            }
        })
}