var request = require('supertest');
var path = require('path');
var deadServerSpa = require('..').start({
	root: path.join(__dirname, "data"),
	port: 0,
	open: false,
	middleware: ["spa"]
});
var deadServerSpaIgnoreAssets = require('..').start({
	root: path.join(__dirname, "data"),
	port: 0,
	open: false,
	middleware: ["spa-ignore-assets"]
});

describe('spa tests', function () {
	it('spa should redirect', function (done) {
		request(deadServerSpa)
			.get('/api')
			.expect('Location', /\/#\//)
			.expect(302, done);
	});
	it('spa should redirect everything', function (done) {
		request(deadServerSpa)
			.get('/style.css')
			.expect('Location', /\/#\//)
			.expect(302, done);
	});
	it('spa-ignore-assets should redirect something', function (done) {
		request(deadServerSpaIgnoreAssets)
			.get('/api')
			.expect('Location', /\/#\//)
			.expect(302, done);
	});
	it('spa-ignore-assets should not redirect .css', function (done) {
		request(deadServerSpaIgnoreAssets)
			.get('/style.css')
			.expect(200, done);
	});
});
