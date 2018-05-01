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

function getImageElementForMapElement (elem) {
    var parent = elem;
    while (parent) {
        if (parent.tagName.toLowerCase() === "map") {
            break;
        }
        parent = parent.parentNode;
    }

    if (parent) {
        var name = parent.name;
        for (var i = 0; i < document.images.length; i++) {
            if (document.images[i].useMap.substring(1) === name) {
                return document.images[i];
            }
        }
    }
}

function calcRectForElement (elem) {
    var imgElem = null;
    var rect = null;

    if (elem.tagName.toLowerCase() === "map") {
        imgElem = getImageElementForMapElement(elem);
        rect = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };

        if (!imgElem) {
            return rect;
        }

        return imgElem.getBoundingClientRect();
    }
    else if (elem.tagName.toLowerCase() === "area") {
        imgElem = getImageElementForMapElement(elem);
        rect = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };

        if (!imgElem) {
            return rect;
        }

        var img_rect = imgElem.getBoundingClientRect();
        var coords = elem.coords.split(/\s*,\s*/);
        coords = coords.map(function (e) {
            return parseInt(e, 10);
        });

        switch (elem.shape.toLowerCase()) {
            case "rect":
                if (coords.length === 4) {
                    rect.left = coords[0];
                    rect.top = coords[1];
                    rect.right = coords[2];
                    rect.bottom = coords[3];
                }
                break;
            case "circle":
                if (coords.length === 3) {
                    var x = coords[0];
                    var y = coords[1];
                    var radius = coords[2];
                    if (radius < 0) {
                        break;
                    }

                    rect.left = x - radius;
                    rect.top = y - radius;
                    rect.right = x + radius;
                    rect.bottom = y + radius;
                }
                break;
            case "poly":
            case "polygon":
                if (coords.length >= 2) {
                    var x1, x2;
                    var y1, y2;
                    x1 = x2 = coords[0];
                    y1 = y2 = coords[1];
                    for (var i = 2; i < coords.length; i += 2) {
                        x1 = x1 < coords[i] ? x1 : coords[i];
                        x2 = x2 > coords[i] ? x2 : coords[i];
                        y1 = y1 < coords[i + 1] ? y1 : coords[i + 1];
                        y2 = y2 > coords[i + 1] ? y2 : coords[i + 1];
                    }
                    rect.left = x1;
                    rect.top = y1;
                    rect.right = x2;
                    rect.bottom = y2;
                }
                break;
        }

        var calcRect = {
            left: Math.round(img_rect.left + rect.left),
            top: Math.round(img_rect.top + rect.top),
            right: Math.round(img_rect.left + rect.right),
            bottom: Math.round(img_rect.top + rect.bottom)
        };

        calcRect.width = calcRect.right - calcRect.left;
        calcRect.height = calcRect.bottom - calcRect.top;
        return calcRect;
    }
    else {
        return elem.getBoundingClientRect();
    }
}

function getRect(elem) {    
    var rect = calcRectForElement(elem);

    // getBoundingClientRect returns the location of the element relatively to the visible part of the page,
    // but since in firefox until version 48 (firefox which doesn't support gecko) and IE the screenshot is taken for the whole page,
    // we need to calculate the absolute location of the element in the page.
    if(isFirefox() || isIe() ) {
        return {
            left: Math.floor(rect.left + window.pageXOffset),
            top: Math.floor(rect.top + window.pageYOffset),
            width: Math.floor(rect.width),
            height: Math.floor(rect.height)};
    }

    return {
        left: Math.floor(rect.left),
        top: Math.floor(rect.top),
        width: Math.floor(rect.width),
        height: Math.floor(rect.height)};
}

function isFirefox(){
    var browserDetails =  navigator.userAgent.match(/(firefox(?=\/))\/?s*(\d+)/i);
    return browserDetails && browserDetails[1].toLowerCase() === 'firefox' &&  browserDetails[2] < 48;
}

function isIe(){
    return (/*@cc_on!@*/ false || !!document.documentMode);
}

var elem = arguments[0];

// For chrome, takeScreenshot take only the visible part of the page, so we must make the element visible.
// For firefox, the screenshot is taken for the whole page, but we also will make the element visible.
elem.scrollIntoView(true);

return getRect(elem);