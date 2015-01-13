var Code = require('code');
var Lab = require('lab');

var lab = exports.lab = Lab.script();
var it = lab.test;
var expect = Code.expect;


it('should fail test', function (done) {

  console.log('\n\n');

  expect(true).to.equal(false);

  done();
});
