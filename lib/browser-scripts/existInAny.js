/*! (c) Copyright 2015 – 2021 Micro Focus or one of its affiliates. */
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

var matchedArrays = arguments[0];
var uniqueElems = [];

// Insert all elements into a hash table to achieve every element uniquely.
Array.prototype.forEach.call(matchedArrays, function(arr) {
    Array.prototype.forEach.call(arr, function(elem) {
        if(uniqueElems.indexOf(elem) === -1) {
            uniqueElems.push(elem);
        }
    });
});

return uniqueElems;