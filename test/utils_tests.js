/*! (c) Copyright 2015 - 2018 Micro Focus or one of its affiliates. */
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

var assert = require("assert");
var sinon = require("sinon");
var Q = require("q");

describe("utils test", function() {
    var utils_under_test;
    var elemMock;

    beforeEach(function() {
        utils_under_test = require("../lib/utils.js").Utils;
        elemMock = {
            driver_: {
                wait: sinon.stub(),
                executeScript: sinon.stub().returns(Q.resolve(1)),
                takeScreenshot: sinon.stub().returns(Q.resolve(1)),
                executeAsyncScript: sinon.stub().returns(Q.resolve(1))
            }
        };
    });

    describe("getSnapshot", function() {
        it("should call driver.executeScript once", function() {
            utils_under_test.getSnapshot(elemMock);
            sinon.assert.calledOnce(elemMock.driver_.executeScript);
        });

        it("should call driver.takeScreenshot once", function() {
            utils_under_test.getSnapshot(elemMock).then(function(result) {
                sinon.assert.calledTwice(elemMock.driver_.takeScreenshot);
            });
        });
    });

    describe("highlight",function() {
        it("should call driver.executeScript once", function() {
            utils_under_test.highlight(elemMock);
            sinon.assert.calledOnce(elemMock.driver_.executeScript);
        });
    });
});