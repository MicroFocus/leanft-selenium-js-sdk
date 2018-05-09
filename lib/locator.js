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

var path = require('path');
var internalUtils = require("./internalUtils").InternalUtils;
var util = require("util");
var Q = require("q");

var innerBy;
var GET_ELEMENT_BY_REGEX_FUNCTION = internalUtils.read(path.resolve(__dirname, 'browser-scripts', 'getElementsByRegExp.js'));
var GET_ELEMENTS_BY_VISIBLE_TEXT_FUNCTION = internalUtils.read(path.resolve(__dirname, 'browser-scripts', 'getElementsByVisibleText.js'));
var GET_ELEMENTS_BY_STYLE_FUNCTION = internalUtils.read(path.resolve(__dirname, 'browser-scripts', 'getElementsByStyles.js'));
var GET_ELEMENT_BY_REGEXP_ATTRIBUTES_FUNCTION = internalUtils.read(path.resolve(__dirname, 'browser-scripts', 'getElementsByAttributes.js'));
var GET_ELEMENTS_BY_IS_VISIBLE_FUNCTION = internalUtils.read(path.resolve(__dirname, 'browser-scripts', 'getElementsByVisible.js'));
var EXIST_IN_ANY_FUNCTION = internalUtils.read(path.resolve(__dirname, 'browser-scripts', 'existInAny.js'));

/**
 * LeanFT for Selenium namespace
 * @namespace LFTForSelenium
 */

/**
 * Contains all LeanFT for Selenium By methods for locating elements.
 * @class By
 * @memberof LFTForSelenium
 */
var L4SBy = {};

module.exports.By = function(By) {
    if (!By) {
        throw new Error("Argument not defined");
    }

    // Validate the argument is by.
    if (!By.id) {
        throw "Argument must have Selenium's by methods.";
    }

    // Iterate over Selenium's by methods.
    internalUtils.inherit(By, L4SBy);

    /**
     * Returns a function that locates and returns elements according to one or more locators (attributes, tags, styles etc.).
     * @function each
     * @param {Object[]} bys The locators (Bys) by which the elements are identified.
     * @returns A function that locates and returns elements that matches all the locators.
     * @memberof LFTForSelenium.By#
     */
    L4SBy.each = each;

    /**
     * Returns a function that locates and returns elements with the provided visibleText parameter.
     * @function visibleText
     * @param {String} text The text by which the elements are identified.
     * @returns A function that locates and returns elements that contains the visibleText.
     * @memberof LFTForSelenium.By#
     */
    L4SBy.visibleText = visibleText;

    /**
     * Returns a function that locates and returns elements that are either visible or not, depending on the paramater passed.
     * @function visible
     * @param {Boolean} visible Whether the elements are visible.
     * @returns A function that locates and returns elements that are either visible or not, depending on the paramater passed.
     * @memberof LFTForSelenium.By#
     */
    L4SBy.visible = visible;

    /**
     * Returns a function that locates and returns elements with the provided name parameter.
     * The LeanFT locator is used only when the value passed is a regular expression. Otherwise, the Selenium locator is used.
     * @function name
     * @param {RegExp} name The name of the elements in the form of a regular expression.
     * @returns A function that locates and returns elements with the given name.
     * @memberof LFTForSelenium.By#
     */
    L4SBy.name = byRegex.bind(undefined, "name", undefined);

    /**
     * Returns a function that locates and returns elements with the provided className parameter.
     * The LeanFT locator is used only when the value passed is a regular expression. Otherwise, the Selenium locator is used.
     * @function className
     * @param {RegExp} className The className of the elements in the form of a regular expression.
     * @returns A function that locates and returns elements with the given className.
     * @memberof LFTForSelenium.By#
     */
    L4SBy.className = byRegex.bind(undefined, "className", undefined);

    /**
     * Returns a function that locates and returns elements with the provided ID parameter.
     * The LeanFT locator is used only when the value passed is a regular expression. Otherwise, the Selenium locator is used.
     * @function id
     * @param {RegExp} id The ID of the elements in the form of a regular expression.
     * @returns A function that locates and returns elements with the given ID.
     * @memberof LFTForSelenium.By#
     */
    L4SBy.id = byRegex.bind(undefined, "id", undefined);

    /**
     * Returns a function that locates and returns elements with the provided tagName parameter.
     * The LeanFT locator is used only when the value passed is a regular expression. Otherwise, the Selenium locator is used.
     * @function tagName
     * @param {RegExp} tagName The tagName of the elements in the form of a regular expression.
     * @returns A function that locates and returns elements with the given tagName.
     * @memberof LFTForSelenium.By#
     */
    L4SBy.tagName = byRegex.bind(undefined, "tagName", undefined);

    /**
     * Returns a function that locates and returns elements with the provided linkText parameter.
     * The LeanFT locator is used only when the value passed is a regular expression. Otherwise, the Selenium locator is used.
     * @function linkText
     * @param {RegExp} linkText The linkText of the elements in the form of a regular expression.
     * @returns A function that locates and returns elements with the given linkText.
     * @memberof LFTForSelenium.By#
     */
    L4SBy.linkText = byRegex.bind(undefined, "linkText", undefined);

    /**
     * Returns a function that locates and returns elements with the provided role parameter.
     * The LeanFT locator is used only when the value passed is a regular expression. Otherwise, the Selenium locator is used.
     * @function role
     * @param {RegExp} role The role of the elements in the form of a regular expression.
     * @returns A function that locates and returns elements with the given role.
     * @memberof LFTForSelenium.By#
     */
    L4SBy.role = byRegex.bind(undefined, "role", xpathForProps.bind(undefined, "role"));

    /**
     * Returns a function that locates and returns elements with the provided type parameter.
     * The LeanFT locator is used only when the value passed is a regular expression. Otherwise, the Selenium locator is used.
     * @function type
     * @param {RegExp} type The type of the elements in the form of a regular expression.
     * @returns A function that locates and returns elements with the given type.
     * @memberof LFTForSelenium.By#
     */
    L4SBy.type = byRegex.bind(undefined, "type", xpathForProps.bind(undefined, "type"));

    /**
     * Returns a function that locates and returns elements according to the provided attributes. You can also use regular expressions.
     * @function attributes
     * @param {Object} attributes The attributes by which the elements are identified.
     * @returns A function that locates and returns elements with matching attributes.
     * @memberof LFTForSelenium.By#
     */
    L4SBy.attributes = byAttributes;

    /**
     * Returns a function that locates and returns elements according to one or more styles. You can also use regular expressions.
     * @function styles
     * @param {Object} styles The styles by which the elements are identified.
     * @returns A function that locates and returns elements with matching styles.
     * @memberof LFTForSelenium.By#
     */
    L4SBy.styles = byStyles;

    /**
     * Returns a function that locates and returns elements that match at least one of the locators provided (OR).
     * @function any
     * @param {Object[]} bys At least one of these locators are used to identify the elements.
     * @returns A function that locates and returns elements that match at least one of the provided locators.
     * @memberof LFTForSelenium.By#
     */
    L4SBy.any = any;

    /**
     * Returns a function that locates and returns elements by using locators that describe the elements and their ancestors (higher level elements).
     * @function chained
     * @param {Object[]} bys A list of locators, each representing a level in the hierarchy, starting with the highest level.
     * @returns A function that locates and returns elements nested within the hierarchy that contains the provided locators.
     * @memberof LFTForSelenium.By#
     */
    L4SBy.chained = chained;

    innerBy = By;

    return L4SBy;
};

var each = function (bys) {
    return function (context) {
        if (!bys || !Array.isArray(bys) || bys.length === 0) {
            throw new Error("By.each: Invalid By list.");
        }

        var promises = bys.map(function (by, index) {
            if (by === undefined || typeof(by) == 'string' || typeof(by) == 'number') {
                throw new Error("By.each: Argument #" + (index + 1) + " is invalid.");
            }

            return context.findElements(by);
        });

        return Q.allSettled(promises).then(function (result_elem_arrays) {
            var arrays = result_elem_arrays.map(function(array) {
                return array.value;
            });

            var matchedArr = arrays.pop();

            Array.prototype.forEach.call(arrays, function(arr) {
                matchedArr = Array.prototype.filter.call(arr, function(elem) {
                    return matchedArr.filter(function(matchedElement) {
                            return matchedElement.getId().value_ === elem.getId().value_;
                        }).length > 0;
                });
            });

            return matchedArr;
        });
    };
};

// fallback is the function to use in case of using a non-regex value.
var byRegex = function (propName, fallback, value) {
    fallback = fallback || innerBy[propName];
    if (!(value instanceof RegExp)) {
        return fallback(value);
    }

    return function (context) {
        // Check if findElements was called from element or from the driver itself.
        var elem = isElement(context) ? context : null;
        var driver = getJsExecutor(context);

        var tagFilter = propName === "linkText" ? "a" : null;
        return driver.executeScript(GET_ELEMENT_BY_REGEX_FUNCTION, elem, tagFilter, propName, value.source, value.ignoreCase);
    };
};

// This method builds a query based on a xpath.
var xpathForProps = function (propName, value) {
    if (typeof(value) !== "string") {
        throw new Error("By." + propName + ": Argument must be a string.");
    }

    var xpathStr = ".//*[@" + propName + " = '" + value + "']";

    return innerBy.xpath(xpathStr);
};

var byAttributes = function(attributes) {
    if (typeof(attributes) !== "object") {
        throw new Error("By.attributes: Argument must be an object.");
    }

    for (var attribute in attributes) {
        var isRegexp =  attributes[attribute] instanceof RegExp;
        attributes[attribute] = {
            type: isRegexp ? "RegExp" : "String",
            value: isRegexp ? attributes[attribute].source : attributes[attribute]
        };
    }

    return function(context) {
        var element = isElement(context) ? context : null;
        var driver = getJsExecutor(context);

        return driver.executeScript(GET_ELEMENT_BY_REGEXP_ATTRIBUTES_FUNCTION, element, attributes);
    };
};

var byStyles = function(styles) {
    if (typeof(styles) !== "object") {
        throw new Error("By.styles: Argument must be an object.");
    }

    for (var style in styles) {
        var isRegEx = styles[style] instanceof RegExp;

        styles[style] = {
            type: isRegEx ? "RegExp" : "String",
            value: isRegEx ? styles[style].source : styles[style]
        };
    }

    return function(context) {
        // Check if findElements was called from element or from the driver itself.
        var elem = isElement(context) ? context : null;
        var driver = getJsExecutor(context);

        return driver.executeScript(GET_ELEMENTS_BY_STYLE_FUNCTION, elem, styles);
    };
};

var visibleText = function(text) {
    return function(context) {
        // Verify that text is either a string or a RegExp.
        if (typeof(text) != "string" && !(text instanceof RegExp)) {
            throw new Error("By.visibleText: Argument must be a string or a regular expression.");
        }

        var textFlags, isRegex;
        var elem = isElement(context) ? context : null;
        var driver = getJsExecutor(context);

        if (text instanceof RegExp) {
            isRegex = true;
            textFlags = text.ignoreCase;
            text = text.source;
        }

        return driver.executeScript(GET_ELEMENTS_BY_VISIBLE_TEXT_FUNCTION, text, textFlags, elem, isRegex);
    };
};

var visible = function(visible) {
    return function(context) {
        if (typeof(visible) != "boolean") {
            throw new Error("By.visible: Argument must be a boolean.");
        }

        var elem = isElement(context) ? context : null;
        var driver = getJsExecutor(context);
        return driver.executeScript(GET_ELEMENTS_BY_IS_VISIBLE_FUNCTION, elem, visible);
    };
};

var isElement = function(context) {
    return !!context.driver_;
};

var getJsExecutor = function(context) {
    if (isElement(context)) {
        return context.driver_;
    }

    return context;
};

var any = function(bys) {
    return function(context) {
        if (!bys || !Array.isArray(bys) || bys.length === 0) {
            throw new Error("By.any: Invalid By list.");
        }

        var promises = bys.map(function(by, index) {
            if (by === undefined || typeof(by) == 'string' || typeof(by) == 'number') {
                throw new Error("By.any: Argument #" + (index + 1) + " is invalid.");
            }

            return context.findElements(by);
        });

        return Q.all(promises).then(function(result_elem_arrays) {
            var executor = getJsExecutor(context);

            return executor.executeScript(EXIST_IN_ANY_FUNCTION, result_elem_arrays).then(function(result) {
                return result;
            });
        });
    };
};

var chained = function(bys) {
    return function(context) {
        if (!bys || !Array.isArray(bys) || bys.length === 0) {
            throw new Error("By.chained: Invalid By list.");
        }

        if (bys.length === 1) {
            return context.findElements(bys.pop());
        }

        return internalChained(context, bys);
    };
};

var internalChained = function(context, bys) {
    return context.findElements(bys.shift()).then(function(elements) {
        // Elements are the leaves.
        if (bys.length === 0)
            return elements;

        // Context is an element without children.
        if (elements.length === 0)
            return [];

        // Context is a parent that has elements that are not leaves.
        var promises = elements.map(function(element) {
            return internalChained(element, bys.slice());
        });

        return Q.all(promises).then(function(foundElementsArrays) {
            return foundElementsArrays.reduce(function(prev, curr) {
                return prev.concat(curr);
            });
        });
    });
};