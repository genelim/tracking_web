var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 1234;
    location = require('./app/routes/location'),

    
    
app.use(bodyParser.json()); 
app.use('/app', express.static(__dirname + '/public/app'));
app.use('/assets', express.static(__dirname + '/public/assets'));
app.use('/libs', express.static(__dirname + '/public/libs'));

app.get('/api/location', location.get);
app.post('/api/location', location.add);

app.all('/*', function(req, res, next) {
    res.sendFile('/public/index.html', { root: __dirname });
});    

app.listen('1234');
console.log('The magic happens on port 1234');