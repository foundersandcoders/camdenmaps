// Load modules

var Lab = require('lab');
var Fs = require('fs');
var Faketoe = require('../lib');


// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;


describe('createParser()', function () {

    it('parses arrays with object members', function (done) {

        var parser = Faketoe.createParser(function (err, result) {

            expect(err).to.not.exist;
            expect(result.item).to.deep.equal({
                name: '1',
                property: 'a',
                child: [
                {
                    name: '2',
                    property: 'a',
                    child: [
                    {
                        name: '3',
                        property: 'a'
                    },
                    {
                        name: '4'
                    }
                    ]
                },
                {
                    name: '5'
                }
                ],
                goblins: {
                    goblin: [
                    {
                        type: 'ear'
                    },
                    {
                        type: 'nose'
                    },
                    {
                        type: 'throat'
                    },
                    ]
                },
                x: {
                    y: [
                    'a',
                    'b',
                    'c'
                    ]
                },
                y: {
                    verbose: 'yes',
                    child: {
                        name: 'test',
                        property: 'a'
                    }
                },
                extra: {
                    extended: 'yes'
                },
                z: {
                    verbose: 'no',
                    '$text': 'a'
                }
            });
            done();
        });

        Fs.createReadStream(__dirname + '/test1.xml').pipe(parser);
    });

    it('fails to parse mix of text and child', function (done) {

        var parser = Faketoe.createParser(function (err, result) {

            expect(err).to.exist;
            expect(err.message).to.equal('Element contains mixture of text (text) and child (y) combination');
            done();
        });

        parser.write('<x>text<y /></x>');
        parser.end();
    });
});

