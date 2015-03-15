var events, expat, stripNamespace;

expat = require("node-expat");

events = require("events");

exports.parse = function(readStream, options) {
  var each, emitter, parser, _ref;
  
  if (options == null) {
    options = {};
  }

  if ((_ref = options.stripNamespaces) == null) {
    options.stripNamespaces = true;
  }

  parser = new expat.Parser("UTF-8");
  emitter = new events.EventEmitter();

  readStream.on("data", function(data) {
    return parser.parse(data.toString());
  });

  readStream.on("end", function() {
    return process.nextTick(function() {
      return emitter.emit("end");
    });
  });

  readStream.on("error", function(err) {
    return emitter.emit("error", err);
  });

  readStream.on("close", function() {
    return emitter.emit("close");
  });

  each = function(nodeName, eachNode) {

    var currentNode, eachNodeDelayed;

    eachNodeDelayed = function(node) {
      return process.nextTick(function() {
        return eachNode(node);
      });
    };
    currentNode = null;

    parser.on("error", function(err) {
      return emitter.emit("error", err);
    });

    parser.on("startElement", function(name, attrs) {

      if (options.stripNamespaces) {
        name = stripNamespace(name);
      }

      if (name === nodeName || currentNode) {

        return currentNode = {
          tagName: name,
          attributes: attrs,
          $parent: currentNode
        };
      }
    });

    parser.on("text", function(text) {

      var _ref2;

      if (!(currentNode != null)) {
        return;
      }

      if ((_ref2 = currentNode.$text) == null) {
        currentNode.$text = "";
      }

      return currentNode.$text += text;
    });

    return parser.on("endElement", function(name) {

      var parent, _ref2;

      if (!(currentNode != null)) {
        return;
      }

      if (currentNode.tagName === nodeName) {

        if (currentNode.$parent) {
          throw new Error("Top-level node should not have a parent. Possible memory leak");
        }

        eachNodeDelayed(currentNode);
      }

      parent = currentNode.$parent;

      if (parent != null) {

        delete currentNode.$parent;

        if ((_ref2 = parent.$children) == null) {
          parent.$children = [];
        }

        parent.$children.push(currentNode);
        parent[currentNode.$name] = currentNode;
      }

      return currentNode = parent;
    });
  };

  return {
    each: each,

    on: function(e, cb) {
      return emitter.on(e, cb);
    },

    pause: function() {
      return readStream.pause();
    },

    resume: function() {
      return readStream.resume();
    }
  };
};

stripNamespace = function(name) {
  return name.replace(/^.*:/, "");
};
