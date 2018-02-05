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

var internalUtils = require("./internalUtils.js").InternalUtils;
var path = require('path');
var PNGCrop = require('png-crop');
var Buffer = require('buffer').Buffer;
var Q = require("q");

var SCROLL_AND_GET_RECT_FUNCTION = internalUtils.read(path.resolve(__dirname, 'browser-scripts', 'scrollAndGetRect.js'));
var HIGHLIGHT_FUNCTION = internalUtils.read(path.resolve(__dirname, 'browser-scripts', 'highlight.js'));

/**
 * LeanFT for Selenium utilities.
 * @class Utils
 * @memberof LFTForSelenium
 */
var Utils = {
    /**
     * Returns a snapshot (image) of the selenium element as a Base64 string. 
     * @param {*} elem The element to retrieve a snapshot for.
     * @returns A snapshot of the element as a Base64 image.
     * @memberof LFTForSelenium.Utils#
     */
    getSnapshot: function(elem) {
        var driver;
        var rect;

        if (!elem) {
            throw new Error("Utils.getSnapshot: Argument not supported.");
        }

        if (elem.driver_) {
            driver = elem.driver_;
        } else if (elem.session_) {
            // The element is the driver itself.
            return elem.takeScreenshot();
        } else {
            throw new Error("Utils.getSnapshot: Argument not supported.");
        }
        
        return driver.executeScript(SCROLL_AND_GET_RECT_FUNCTION, elem)
            .then(function(rect_result) {                
                rect = rect_result;
                if (rect.top < 0) {
                    rect.top = 0;
                }
            
                return driver.takeScreenshot();
            })
            .then(function(base_64_data) {
                // If the rect_result's width or height is zero we return empty buffer.
                if (rect.width === 0 || rect.height === 0) {
                     return Q.resolve(new Buffer(0));
                }

                // Don't take screenshot if the rect is outside of the screenshot.
                var screenshotDimensions = Utils.getPngDimensions(base_64_data);
                if(screenshotDimensions.width < rect.width + rect.left ||
                    screenshotDimensions.height < rect.height + rect.top){
                    return Q.reject("Rectangle is outside of the image size.");
                }

                var buffer = new Buffer(base_64_data, 'base64');
                var config = {
                    width: rect.width,
                    height: rect.height,
                    top: rect.top,
                    left: rect.left
                };             

                var deferred = Q.defer();
                PNGCrop.cropToStream(buffer, config, function(err, stream) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        var bufs = [];

                        stream.on('data', function(chunk) {
                            bufs.push(chunk);
                        });

                        stream.on('end', function(err) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                var buf = Buffer.concat(bufs);
                                deferred.resolve(buf.toString('base64'));
                            }
                        });
                        stream.on('error', function(err) {
                            deferred.reject(err);
                        });
                    }
                });
                return deferred.promise;
            });
    },

    getPngDimensions: function(base64) {
        // Decode base64 image and retrieve width and height.
        // A PNG starts with the bytes 89 50 4E 47 0D 01 1A 0A, followed by the IHDR chunk that
        // contains the width and height and must be the first chunk.
        // A chunk has a 4-byte length, a 4-byte type, and then a length-byte content.
        // IHDR’s content starts with a 4-byte width and a 4-byte height, so a PNG’s width and height are always bytes 16-24.
        var header = (new Buffer(base64.slice(0, 50), 'base64').toString()).slice(16, 24);
        var uint8 = Uint8Array.from(header, function (c) {
            return c.charCodeAt(0);
        });

        var dataView = new DataView(uint8.buffer);

        return {
            width: dataView.getInt32(0),
            height: dataView.getInt32(4)
        };
    },
    
    /**
     * Highlights the selenium element in the browser.
     * @param {*} elem The element to highlight.
     * @returns A promise that is resolved if the highlight succeeds, and rejected otherwise.
     * @memberof LFTForSelenium.Utils#
     */
    highlight: function(elem) {
         if (!elem || !elem.driver_) {
            throw new Error("Argument must have a driver property");
        }

        var result = elem.driver_.executeScript(HIGHLIGHT_FUNCTION, elem);

        // Wait for the highlight to finish.
        internalUtils.wait(elem.driver_, 1000);

        return result;
    }
};

module.exports.Utils = {
    highlight: Utils.highlight,
    getSnapshot: Utils.getSnapshot
};
