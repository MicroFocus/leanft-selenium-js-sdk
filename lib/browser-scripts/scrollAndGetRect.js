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

function getRect(elem) {    
    var rect = elem.getBoundingClientRect();

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

function isChrome(){
    return !!window.chrome && !!window.chrome.webstore;
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