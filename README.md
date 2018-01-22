# leanft-selenium-js-sdk

LeanFT JavaScript SDK for Selenium

LeanFT for Selenium JavaScript SDK LeanFT for Selenium JavaScript SDK extends the Selenium WebDriver API with locators and utilities that enable creating tests that are more robust, and reduces Selenium test automation and maintenance efforts.

## Install

```
npm install leanft-selenium-js-sdk --save
```

## Usage Example

The following example demonstrates locating elements by their visible text.

```js
var webdriver = require("selenium-webdriver");
var Builder = webdriver.Builder;
var LeanFT4S = require("leanft-selenium-js-sdk");
var By = LeanFT4S.By(webdriver.By);

var driver = new Builder().forBrowser("chrome").build();

driver.get("http://www.google.com/en");

// Locates the "Google Search" button
var element = driver.findElement(By.visibleText("Google Search"));

driver.quit();
```

The following example demonstrates locating elements using a regular expression.

```js
var webdriver = require("selenium-webdriver");
var Builder = webdriver.Builder;
var LeanFT4S = require("leanft-selenium-js-sdk");
var By = LeanFT4S.By(webdriver.By);

var driver = new Builder().forBrowser("chrome").build();
driver.get("http://www.google.com");

var element = driver.findElement(By.name(/^btn/));

driver.quit();
```

Locate an element using its HTML attributes and highlight it.

```js
var webdriver = require("selenium-webdriver");
var Builder = webdriver.Builder;
var LeanFTForSelenium = require("leanft-selenium-js-sdk");
var Utils = LeanFTForSelenium.Utils;
var By = LeanFTForSelenium.By(webdriver.By);

var driver = new Builder().forBrowser("chrome").build();

driver.get("http://www.google.com");

var element = driver.findElement(By.attributes({
	"class": "gsfi lst-d-f",
	"id": "lst-ib"
}));

Utils.highlight(element);

driver.quit();
```

## API

LeanFT for Selenium API reference documentation can be found [here
](https://admhelp.microfocus.com/leanft/en/latest/HelpCenter/Content/JS4S_SDK/top-Selenium-JS.htm)

### New Locators

#### By.visibleText

Returns a new locator that enables finding elements based on their visible text.

#### By.visible

Returns a new locator that enables finding elements based on their visibility.

#### By.role

Returns a new locator that enables finding elements based on their role.

#### By.type

Returns a new locator that enables finding elements based on their type.

#### By.attributes

Returns a new locator that enables finding elements based on their attributes (one or more). Attribute values can be defined using regular expressions.

#### By.styles

Returns a new locator that enables finding elements based on their computed style (one or more). Computed style values can be defined using regular expressions.

#### By.each

Returns a new locator that enables finding elements based on a combination of locators (attributes, tags, styles etc.).

#### By.any

Returns a new locator that locates elements that match at least one of the locators provided (OR).

#### By.chained

Returns a new locator that locates elements by using locators that describe the elements and their ancestors (higher level elements).

### Regular Expression Support

All the locators which accept a string as a value of the element's property, were extended to support regular expressions including the following Selenium native locators:

* By.id
* By.className
* By.linkText
* By.name
* By.tagName

## Utilities

### Utils.getSnapshot

Returns a snapshot (image) of the selenium element as a Base64 string.

### Utils.highlight

Highlights the selenium element in the browser.


## build

To build the project, clone it and run the following command:

```
npm install gulp -g
npm install
gulp build
```

## Running Test

To run the unit-tests of the project after you have built it run the following command:

```
gulp test
```
