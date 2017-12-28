// (c) Copyright 2015 EntIT Software LLC

module.exports.By = require("./lib/locator.js").By;
module.exports.Utils = require("./lib/utils.js").Utils;
module.exports.InternalUtils = {
  highlightElements: require("./lib/internalUtils.js").InternalUtils.highlightElements
};