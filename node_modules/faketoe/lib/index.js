// Load modules

var NodeUtil = require('util');
var Expat = require('node-expat');


// Declare internals

var internals = {};


exports.createParser = function (callback) {

    // State variables

    var result = {};            // Final result object
    var node = result;          // Current node
    var text = '';              // Current text value
    var attrs = [];           // Current attributes
    var tree = [];              // Array of parents to current node
    var errorMessage = null;           // Last errorMessage found

    // Create parser instance

    var parser = new Expat.Parser('UTF-8');

    parser.on('startElement', function (name, attributes) {

        attrs.push(Object.keys(attributes).length ? attributes : null);
        text = internals.cleanText(text);
        if (text) {
            errorMessage = 'Element contains mixture of text (' + text + ') and child (' + name + ') combination';
            text = '';          // Flush out text
        }

        // Check if within an array

        if (node instanceof Array) {
            tree.push(node);
            var child = {};
            node.push(child);
            tree.push(child);
            child[name] = {};
            node = child[name];
        }
        else {

            // Check for existing node with same name

            if (node[name]) {
                if (node[name] instanceof Array === false) {

                    // Convert to array

                    var value = node[name];
                    node[name] = [value];
                }
            }
            else {
                node[name] = {};
            }

            tree.push(node);
            node = node[name];
        }
    });

    parser.on('endElement', function (name) {

        var value;
        var elementAttrs = attrs.pop();

        node = tree.pop();              // Return to parent

        text = internals.cleanText(text);
        if (text) {
            if (elementAttrs) {
                value = elementAttrs;
                value['$text'] = text;
            } else {
                value = text;
            }

            if (node[name] instanceof Array) {
                node[name].push(value);
            }
            else {
                node[name] = value;
            }

            text = '';
        }
        else {
            value = elementAttrs || '';

            if (node instanceof Array) {
                node = tree.pop();      // Return to parent
            }
            else if (node[name] instanceof Array) {
                node[name].push(value);
            }
            else if (Object.keys(node[name]).length === 0) {
                node[name] = value;
            }
            else if (typeof value === 'object') {
                var keys = Object.keys(value);
                for (var i = 0, il = keys.length; i < il; ++i) {
                    var key = keys[i];
                    node[name][key] = value[key];
                }
            }
        }
    });

    parser.on('text', function (str) {

        text += str;
    });

    parser.on('end', function () {

        parser.removeAllListeners();
        var message = errorMessage || parser.getError();
        if (message) {
            var error = new Error(message);
            error.result = result;
            return callback(error);
        }

        return callback(null, result);
    });

    // parser.on('startCdata', function () {});
    // parser.on('endCdata', function () {});

    return parser;
};


internals.cleanText = function (text) {

    return text.replace(/(^\s+|\s+$)/g, '');
};
