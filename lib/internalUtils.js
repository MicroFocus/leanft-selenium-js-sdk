// (c) Copyright [2018] EntIT Software LLC, a Micro Focus Company
//
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Apache License 2.0 - Apache Software Foundation
// www.apache.org
// Apache License Version 2.0, January 2004 http://www.apache.org/licenses/ TERMS AND CONDITIONS FOR USE, REPRODUCTION ...
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var fs = require("fs");
var path = require('path');
var Q = require("q");

var InternalUtils = {
    read: function (filePath) {
       return fs.readFileSync(filePath, 'utf-8');
    },

    inherit: function(fromObj , toObj) {
        Array.prototype.forEach.call(Object.getOwnPropertyNames(fromObj), function(prop) {
            toObj[prop] = fromObj[prop];
        });
    },

    highlightElements: function(elements) {
        if(!elements || !Array.isArray(elements) || elements.length === 0 || !elements[0].driver_) {
            throw new Error("Invalid argument");
        }

        var result = elements[0].driver_.executeScript(HIGHLIGHT_FUNCTION, elements);

        // Wait for the highlight to finish.
        InternalUtils.wait(elements[0].driver_, 3000);
        
        return result;
    },

    wait: function(driver, ms) {
        driver.wait(function() {
            return Q.delay(ms).then(function() {
                return true;
            });
        });
    }
};

var HIGHLIGHT_FUNCTION = InternalUtils.read(path.resolve(__dirname, 'browser-scripts', 'highlight.js'));

module.exports.InternalUtils = InternalUtils;