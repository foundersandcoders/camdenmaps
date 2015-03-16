#!/usr/bin/env node

var browserPerf = require('browser-perf');

// Command line usage to geneate tmp config file
if (process.argv.length >= 2 && process.argv[2] === '--config') {
	var fs = require('fs'),
		path = require('path');

	var configFile = process.argv[3];
	if (!configFile) {
		throw 'Specify Protractor Configuration file';
	}
	var cfg = require('./' + configFile).config;

	var runner = new browserPerf.runner({
		selenium: cfg.seleniumAddress,
		browsers: [cfg.capabilities]
	});

	runner.config(function(err, data) {
		cfg.capabilities = data.browsers[0];
		cfg.params = cfg.params || {};
		cfg.params.perf = data;
		console.log('Configuration written to', path.basename(configFile) + '.tmp', 'Run protractor with this new file now');
		require('fs').writeFileSync(path.basename(configFile) + '.tmp', 'exports.config=' + JSON.stringify(cfg));
	});
}

// Exported code used inside the test cases

var PerfRunner = function(cfg) {
	this.browserPerfRunner = new browserPerf.runner(cfg);
	this.sessionId = null;
}

PerfRunner.prototype.start = function() {
	var me = this,
		flow = protractor.promise.controlFlow();

	return flow.execute(function() {
		var d = protractor.promise.defer();
		(function() {
			if (me.sessionId === null) {
				return browser.getSession().then(function(session) {
					return protractor.promise.fulfilled(session.getId());
				});
			} else {
				return protractor.promise.fulfilled(me.sessionId);
			}
		}()).then(function(sessionId) {
			me.sessionId = sessionId;
			me.browserPerfRunner.start(me.sessionId, function(err, data) {
				if (err) {
					d.reject();
				} else {
					d.fulfill();
				}
			});
		});
		return d.promise
	});
};

PerfRunner.prototype.stop = function() {
	var me = this,
		flow = protractor.promise.controlFlow();
	return flow.execute(function() {
		var d = protractor.promise.defer(),
			flow = protractor.promise.controlFlow();
		me.browserPerfRunner.stop(function(err, data) {
			if (data) {
				d.fulfill(data);
			} else {
				d.reject(err);
			}
		});
		return d.promise;
	});
}

module.exports = PerfRunner;