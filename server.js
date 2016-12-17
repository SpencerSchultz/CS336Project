var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var db;
var APP_PATH = path.join(__dirname, 'dist');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(APP_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//connect to mongoDB database
MongoClient.connect('mongodb://cs336:Bjarne@ds053808.mlab.com:53808/srs27_cs336', function (err, dbConnection) {
  if (err) throw err;

  db = dbConnection;


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/links', function(req, res) {
    var collection = db.collection('links');
      //get all the links
      collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        res.json(docs);
      });
});


app.post('/api/links', function(req, res) {
    var collection = db.collection('links');

    //make a new link based on data pulled from virtual DOM
    var newLink = {
    //id given as the current date, alsocan be used to help generate statistics
      _id: Date.now(),
      link: req.body.link,
      nickName: req.body.nickName,
      lastVisited: Date.now(),
      tag1: req.body.tag1,
    };

    collection.insert(newLink, function(err, result) {
      assert.equal(err, null);
      res.json(result);
    });
});

app.get('/api/links/:id', function(req, res) {
    db.collection('links').find({"_id": Number(req.params.id)}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});

app.put('/api/links/:id', function(req, res) {
    updateId = Number(req.params.id);
    var update = req.body;
    db.collection('links').updateOne(
        { _id: updateId },
        { $set: update },
        function(err, result) {
            if (err) throw err;
            db.collection('links').find({}).toArray(function(err, docs) {
                if (err) throw err;
                res.json(docs);
            });
        });
});

app.delete('/api/links/:id', function(req, res) {
    db.collection('links').deleteOne(
        {"_id": Number(req.params.id)},
        function(err, result) {
            if (err) throw err;
            db.collection('links').find({}).toArray(function(err, docs) {
                if (err) throw err;
                res.json(docs);
            });
        });
});

app.use('*', express.static(APP_PATH));

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

});
