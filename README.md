# leanft-selenium-js-sdk

The LeanFT JavaScript SDK for Selenium


LeanFT for Selenium JavaScript SDKs that extend the WebDriver API with additional locators and utilities. By using these SDKs you can create more robust or generic identifications for your objects, and use built-in utilities rather than writing them yourself from scratch.

## Install

```
npm install leanft-selenium-js-sdk --save
```

## Usage Example

Locate an element using Regular Expression attributes and highlight it.

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

For full documented API please see LeanFT For Selenium  [Documentation](https://admhelp.microfocus.com/leanft/en/latest/HelpCenter/Content/JS4S_SDK/top-Selenium-JS.htm)

### New Locators
#### By.each

Returns a new locator that locates elements according to one or more locators (attributes, tags, styles etc.).

#### By.visibleText

Returns a new locator that locates elements with the provided visibleText parameter.

#### By.visible

Returns a new locator that locates elements that are either visible or not, depending on the paramater passed.

#### By.name

Returns a new locator that locates elements with the provided name parameter.

#### By.tagName

Returns a new locator that locates elements with the provided tagName parameter.

#### By.linkText

Returns a new locator that locates elements with the provided linkText parameter.

#### By.role

Returns a new locator that locates elements with the provided role parameter.

#### By.type

Returns a new locator that locates elements with the provided type parameter.

#### By.attributes

Returns a new locator that locates elements according to the provided attributes. You can also use regular expressions.

#### By.styles

Returns a new locator that locates elements according to one or more styles. You can also use regular expressions.

#### By.any

Returns a new locator that locates elements that match at least one of the locators provided (OR).

#### By.chained

Returns a new locator that locates elements by using locators that describe the elements and their ancestors (higher level elements).

### Regular Expression Support

All the locators which accepts string as value of the element's property were extended to support regular expressions including the following Selenium native locators:

* By.id
* By.className

## Utilities

### Utils.getSnapshot

Returns a snapshot (image) of the selenium element as a Base64 string.

### Utils.highlight

Highlights the selenium element in the browser.


## build

To build the project clone it and run the following command

```
npm install gulp -g
gulp build
```

## Running Test

To build the project clone it and run the following command

```
npm install gulp -g
gulp test
```
