
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var Dishes = require('../models/dishes');
var Verify = require('./verify');
var app = express();
var leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all(function (req, res, next) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    next();
})

.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    res.end('Will send all the leadership to you!');
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    res.end('Will add the leadership: ' + req.body.name + ' with details: ' + req.body.description);
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    res.end('Deleting all leadership');
});

leaderRouter.route('/:leadershipId')
.all(function (req, res, next) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    next();
})

.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    res.end('Will send details of the leadership: ' + req.params.leadershipId + ' to you!');
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    res.write('Updating the leadership: ' + req.params.leadershipId + '\n');
    res.end('Will update the leadership: ' + req.body.name +
            ' with details: ' + req.body.description);
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    res.end('Deleting leadership: ' + req.params.leadershipId);
});

module.exports = leaderRouter;
