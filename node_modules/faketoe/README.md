![faketoe Logo](https://raw.github.com/hapijs/faketoe/master/images/faketoe.png)

XML to JSON converter

[![Build Status](https://secure.travis-ci.org/hapijs/faketoe.png)](http://travis-ci.org/hapijs/faketoe)

Lead Maintainer: [Nathan LaFreniere](https://github.com/nlf)

## Description
**faketoe** is a simple Node transformation stream for used to convert an XML stream to a JSON object. It is a thin wrapper around [node-expat](https://github.com/node-xmpp/node-expat) and supports the same interface and events as a node-expat object.

## Usage
```javascript
var Fs = require('fs');
var FakeToe = require('./lib');

var parser = FakeToe.createParser(function (error, result) {
    // `result` is:
    // {
    //     item: {
    //             name: '1',
    //         property: 'a',
    //            child: [
    //             [0] {
    //                     name: '2',
    //                 property: 'a',
    //                    child: [
    //                     [0] {
    //                             name: '3',
    //                         property: 'a'
    //                     },
    //                     [1] {
    //                         name: '4'
    //                     }
    //                 ]
    //             },
    //             [1] {
    //                 name: '5'
    //             }
    //         ],
    //          goblins: {
    //             goblin: [
    //                 [0] {
    //                     type: 'ear'
    //                 },
    //                 [1] {
    //                     type: 'nose'
    //                 },
    //                 [2] {
    //                     type: 'throat'
    //                 }
    //             ]
    //         },
    //                x: {
    //               y: [
    //                 [0] 'a',
    //                 [1] 'b',
    //                 [2] 'c'
    //             ]
    //         },
    //            extra: {
    //             extended: 'yes'
    //         },
    //                z: {
    //             verbose: 'no',
    //               $text: 'a'
    //         }
    //     }
    // }

});

parser.on('text', function (text) {

    console.log('text event: ' + text);
});

parser.on('endElement', function (name) {

    console.log('end element event: ' + name);
});

Fs.createReadStream(__dirname + '/test/test1.xml').pipe(parser);
```

### Methods
####`createParser(callback)`
creates an XML to JSON parser (stream). The `callback` function signature is `function (error, result)` where
- `error` - internal error condition
- `result` - the complete JSON object
