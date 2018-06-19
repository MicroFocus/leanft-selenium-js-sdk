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

describe("locator test", function() {
    var locator_under_test;

    beforeEach(function() {
        locator_under_test = require("../lib/locator.js");
    });

    describe("constructor", function() {
        it("should copy methods from the element it received as an argument", function() {
            // The element it received as an argument.
            var byArgMock = {
                test_1: sinon.stub()
            };

            assert.throws(locator_under_test.By.bind(undefined, byArgMock), /Argument must have Selenium's by methods./, 'did not throw with expected message');
        });
    });
});