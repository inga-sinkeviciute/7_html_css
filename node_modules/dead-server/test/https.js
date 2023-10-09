var request = require('supertest');
var path = require('path');
// accept self-signed certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function tests(deadServer) {
	it('should reply with a correct index file', function (done) {
		request(deadServer)
			.get('/index.html')
			.expect('Content-Type', 'text/html; charset=UTF-8')
			.expect(/Hello world/i)
			.expect(200, done);
	});
	it('should support head request', function (done) {
		request(deadServer)
			.head('/index.html')
			.expect('Content-Type', 'text/html; charset=UTF-8')
			.expect(200, done);
	});
}

describe('https tests with external module', function () {
	var opts = {
		root: path.join(__dirname, 'data'),
		port: 0,
		open: false,
		https: path.join(__dirname, 'conf/https.conf.js')
	};
	var deadServer = require("..").start(opts);
	tests(deadServer);
	after(function () {
		deadServer.close()
	});
});

describe('https tests with object', function () {
	var opts = {
		root: path.join(__dirname, 'data'),
		port: 0,
		open: false,
		https: require(path.join(__dirname, 'conf/https.conf.js'))
	};
	var deadServer = require("..").start(opts);
	tests(deadServer);
	after(function () {
		deadServer.close()
	});
});
