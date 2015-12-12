var assert = require('assert');
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var spawn = require('child_process').spawn;

/**
 * Shortcut methods to make our code cleaner.
 */
var by = webdriver.By;
var until = webdriver.until;

/**
 * The port that we'll run the server on/
 * @type {number}
 */
var serverPort = 4000;

/**
 * The URL of the page that we'll run our tests against.
 * @type {string}
 */
var pageURL = 'http://localhost:' + serverPort;

/**
 * Selectors that we'll use to target elements in our tests.
 */
var selectors = {
    application: { css: '.application' },
    createCounter: {
        input: { css: '.new-counter-input input[type="text"]' },
        button: { css: '.new-counter-input button[type="submit"]'}
    },
    counterList: {
        listItem: { css: '.counter-list .list-group-item' },
        firstListItem: { css: '.counter-list .list-group-item:nth-child(1)' },
        firstListItemHeading: { css: '.counter-list .list-group-item:nth-child(1) h4' },
        firstListItemCounter: { css: '.counter-list .list-group-item:nth-child(1) .counter-count' },
        firstListItemIncrementButton: { css: '.counter-list .list-group-item:nth-child(1) .increment-button' },
        firstListItemDecrementButton: { css: '.counter-list .list-group-item:nth-child(1) .decrement-button' },
        firstListItemDeleteButton: { css: '.counter-list .list-group-item:nth-child(1) .delete-button' },
        secondListItem: { css: '.counter-list .list-group-item:nth-child(2)' },
        secondListItemHeading: { css: '.counter-list .list-group-item:nth-child(2) h4' },
        secondListItemCounter: { css: '.counter-list .list-group-item:nth-child(2) .counter-count' },
        secondListItemIncrementButton: { css: '.counter-list .list-group-item:nth-child(2) .increment-button' },
        secondListItemDecrementButton: { css: '.counter-list .list-group-item:nth-child(2) .decrement-button' },
        secondListItemDeleteButton: { css: '.counter-list .list-group-item:nth-child(2) .delete-button' }
    },
    counterTotal: { css: '.counter-total' }
};

/**
 * Create a counter with a specific title using the web driver.
 * @param driver
 * @param title
 */
function createCounter(driver, title) {
    driver.findElement(selectors.createCounter.input).sendKeys(title);
    driver.findElement(selectors.createCounter.button).click();
}

test.describe('Application', function() {

    var server, driver;


    /*
        Before each test is run, spawn the server and start the browser with the web driver attached.
     */
    test.beforeEach(function() {
        server = spawn('node', ['index.js'], {env: Object.assign({PORT: serverPort}, process.env)});
        driver = new webdriver.Builder().forBrowser('firefox').build();
    });

    /*
        After each test is run, terminate the web driver
     */
    test.afterEach(function() {
        driver.quit();
        server.kill('SIGINT');
    });

    /*
        This test makes sure that we can successfully load the page.
     */
    test.it('should show the correct page title', function(done) {
        driver.get(pageURL).then(function() {
            driver.getTitle().then((title) => {
                assert.equal(title, 'Flippa Counter App');
                done();
            });
        });
    });


    /*
        This test creates a new counter and asserts that it appears in the counter list.
     */
    test.it('should be able to create a new counter', function(done) {
        this.timeout(5000);

        driver.get(pageURL).then(function() {
            var counterTitle = 'Flippa!';
            createCounter(driver, counterTitle);

            driver.wait(until.elementLocated(selectors.counterList.firstListItem), 1000);
            driver.findElement(selectors.counterList.firstListItemHeading).getText().then((text) => {
                assert.equal(text, counterTitle);
                done();
            });
        });
    });

    /*
        This test increments the counter and asserts that it's gone up by one.
     */
    test.it('should be able to increment the counter', function(done) {
        this.timeout(5000);

        driver.get(pageURL).then(function() {
            var counterTitle = 'Flippa!';
            createCounter(driver, counterTitle);

            driver.wait(until.elementLocated(selectors.counterList.firstListItem), 1000);

            driver.findElement(selectors.counterList.firstListItemCounter).getText().then((text) => {
                var currentCount = parseInt(text);

                driver.findElement(selectors.counterList.firstListItemIncrementButton).click().then(function() {

                    driver.findElement(selectors.counterList.firstListItemCounter).getText().then((text) => {
                        var newCount = parseInt(text);

                        assert.equal(newCount, currentCount + 1);
                        done();
                    });
                });
            });
        });
    });

    /*
        This test decrements the counter and asserts that it's decreased by one.
     */
    test.it('should be able to decrement the counter', function(done) {
        this.timeout(5000);

        driver.get(pageURL).then(function() {
            var counterTitle = 'Flippa!';
            createCounter(driver, counterTitle);

            driver.wait(until.elementLocated(selectors.counterList.firstListItem), 1000);

            driver.findElement(selectors.counterList.firstListItemIncrementButton).click().then(function() {
                driver.findElement(selectors.counterList.firstListItemCounter).getText().then((text) => {
                    var currentCount = parseInt(text);

                    driver.findElement(selectors.counterList.firstListItemDecrementButton).click().then(function() {

                        driver.findElement(selectors.counterList.firstListItemCounter).getText().then((text) => {
                            var newCount = parseInt(text);

                            assert.equal(newCount, currentCount - 1);
                            done();
                        });
                    });
                });
            });
        });
    });

    /*
        This test deletes the counter and asserts that it's removed from the list.
     */
    test.it('should be able to delete the counter', function(done) {
        this.timeout(5000);

        driver.get(pageURL).then(function() {
            var counterTitle = 'Flippa!';
            createCounter(driver, counterTitle);

            driver.wait(until.elementLocated(selectors.counterList.firstListItem), 1000);

            driver.findElement(selectors.counterList.firstListItemDeleteButton).click().then(function() {
                driver.findElements(selectors.counterList.listItem).then((elements) => {
                    assert.equal(elements.length, 0);
                    done();
                });
            });
        });
    });

    /*
        This test adds two counters, clicks the first one a few times, clicks the second one a few times, and
        asserts that the total is displayed.
     */
    test.it('should be able to total the counters', function(done) {
        this.timeout(5000);

        driver.get(pageURL).then(function() {
            createCounter(driver, 'Flippa!');
            driver.wait(webdriver.until.elementLocated(selectors.counterList.firstListItem), 1000);

            createCounter(driver, 'Another Flippa!');
            driver.wait(webdriver.until.elementLocated(selectors.counterList.secondListItem), 1000);

            var firstCounterClicks = 3;
            var secondCounterClicks = 7;

            for (var i = 0; i < firstCounterClicks; i++) {
                driver.findElement(selectors.counterList.firstListItemIncrementButton).click();
            }

            for (var j = 0; j < secondCounterClicks; j++) {
                driver.findElement(selectors.counterList.secondListItemIncrementButton).click();
            }

            driver.findElement(selectors.counterTotal).getText().then((text) => {
               assert.equal(parseInt(text), firstCounterClicks + secondCounterClicks);
                done();
            });
        });
    });
});




