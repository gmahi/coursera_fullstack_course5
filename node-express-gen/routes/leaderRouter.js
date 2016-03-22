
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all(function (req, res, next) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    next();
})

.get(function (req, res, next) {
    res.end('Will send all the leadership to you!');
})

.post(function (req, res, next) {
    res.end('Will add the leadership: ' + req.body.name + ' with details: ' + req.body.description);
})

.delete(function (req, res, next) {
    res.end('Deleting all leadership');
});

leaderRouter.route('/:leadershipId')
.all(function (req, res, next) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    next();
})

.get(function (req, res, next) {
    res.end('Will send details of the leadership: ' + req.params.leadershipId + ' to you!');
})

.put(function (req, res, next) {
    res.write('Updating the leadership: ' + req.params.leadershipId + '\n');
    res.end('Will update the leadership: ' + req.body.name +
            ' with details: ' + req.body.description);
})

.delete(function (req, res, next) {
    res.end('Deleting leadership: ' + req.params.leadershipId);
});

module.exports = leaderRouter;
