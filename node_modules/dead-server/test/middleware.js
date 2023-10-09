var request = require('supertest');
var path = require('path');
var deadServer1 = require('..').start({
	root: path.join(__dirname, 'data'),
	port: 0,
	open: false,
	middleware: [
		function setStatus(req, res, next) {
			res.statusCode = 201;
			next();
		}
	]
});
var deadServer2 = require('..').start({
	root: path.join(__dirname, 'data'),
	port: 0,
	open: false,
	middleware: ["example"]
});
var deadServer3 = require('..').start({
	root: path.join(__dirname, 'data'),
	port: 0,
	open: false,
	middleware: [path.join(__dirname, 'data', 'middleware.js')]
});

describe('middleware tests', function () {
	it("should respond with middleware function's status code", function (done) {
		request(deadServer1)
			.get('/')
			.expect(201, done);
	});
	it("should respond with built-in middleware's status code", function (done) {
		request(deadServer2)
			.get('/')
			.expect(202, done);
	});
	it("should respond with external middleware's status code", function (done) {
		request(deadServer3)
			.get('/')
			.expect(203, done);
	});
});
