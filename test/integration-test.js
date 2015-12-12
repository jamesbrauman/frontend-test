var assert = require('assert');
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var spawn = require('child_process').spawn;

test.describe('Application', function() {

    var driver, express;

    test.beforeEach(function() {
        express = spawn('node', ['index.js'], {env: Object.assign({PORT: 4000}, process.env)});
        driver = new webdriver.Builder().forBrowser('firefox').build();
    });

    test.afterEach(function() {
       driver.quit();
       express.kill('SIGINT');
    });

    test.it('should show the correct page title', function(done) {
        driver.get('http://localhost:4000').then(function() {
            driver.getTitle().then((title) => {
                assert.equal(title, 'Flippa Counter App');
                done();
            });
        });
    });

    test.it('should be able to create a new counter', function(done) {
        this.timeout(5000);

        driver.get('http://localhost:4000').then(function() {
            driver.findElement({id: 'counter-title'}).sendKeys('Flippa');
            driver.findElement({css: 'button[type="submit"]'}).click();
            driver.wait(webdriver.until.elementLocated({css: '.counter-list .list-group-item:first-child'}), 1000);
            driver.findElement({css: '.counter-list .list-group-item:first-child h4'}).getText().then(function(text) {
                assert.equal(text, 'Flippa');
                done();
            });
        });
    });

    test.it('should be able to increment the counter', function(done) {
        this.timeout(5000);

        driver.get('http://localhost:4000').then(function() {
            driver.findElement({id: 'counter-title'}).sendKeys('Flippa');
            driver.findElement({css: 'button[type="submit"]'}).click();

            driver.wait(webdriver.until.elementLocated({css: '.counter-list .list-group-item:first-child .counter-count'}), 1000);

            driver.findElement({css: '.counter-list .list-group-item:first-child .counter-count'}).getText().then(function(text) {
                var currentCount = parseInt(text);

                driver.findElement({css: '.counter-list .list-group-item:first-child .increment-button'}).click().then(function() {

                    driver.findElement({css: '.counter-list .list-group-item:first-child .counter-count'}).getText().then(function(text) {
                        var newCount = parseInt(text);
                        assert.equal(newCount, currentCount + 1);
                        done();
                    });
                });
            });
        });
    });

    test.it('should be able to decrement the counter', function(done) {
        this.timeout(5000);

        driver.get('http://localhost:4000').then(function() {
            driver.findElement({id: 'counter-title'}).sendKeys('Flippa');
            driver.findElement({css: 'button[type="submit"]'}).click();

            driver.wait(webdriver.until.elementLocated({css: '.counter-list .list-group-item:first-child .counter-count'}), 1000);

            driver.findElement({css: '.counter-list .list-group-item:first-child .increment-button'}).click();

            driver.findElement({css: '.counter-list .list-group-item:first-child .counter-count'}).getText().then(function(text) {
                var currentCount = parseInt(text);

                driver.findElement({css: '.counter-list .list-group-item:first-child .decrement-button'}).click().then(function() {

                    driver.findElement({css: '.counter-list .list-group-item:first-child .counter-count'}).getText().then(function(text) {
                        var newCount = parseInt(text);
                        assert.equal(newCount, currentCount - 1);
                        done();
                    });
                });
            });
        });
    });

    test.it('should be able to delete the counter', function(done) {
        this.timeout(5000);

        driver.get('http://localhost:4000').then(function() {
            driver.findElement({id: 'counter-title'}).sendKeys('Flippa');
            driver.findElement({css: 'button[type="submit"]'}).click();

            driver.wait(webdriver.until.elementLocated({css: '.counter-list .list-group-item:first-child'}), 1000);
            driver.findElement({css: '.counter-list .list-group-item:first-child .delete-button'}).click().then(function() {
                driver.findElements({css: '.counter-list .list-group-item'}).then(function(elements) {
                    assert.equal(elements.length, 0);
                    done();
                });
            });
        });
    });

    test.it('should be able to total the counters', function(done) {
        this.timeout(5000);

        driver.get('http://localhost:4000').then(function() {
            driver.findElement({id: 'counter-title'}).sendKeys('Flippa');
            driver.findElement({css: 'button[type="submit"]'}).click();

            driver.wait(webdriver.until.elementLocated({css: '.counter-list .list-group-item:first-child .counter-count'}), 1000);

            driver.findElement({css: '.counter-list .list-group-item:first-child .increment-button'}).click();
            driver.findElement({css: '.counter-list .list-group-item:first-child .increment-button'}).click();
            driver.findElement({css: '.counter-list .list-group-item:first-child .increment-button'}).click();

            driver.findElement({css: '.counter-total'}).getText().then(function(text) {
               assert.equal(3, parseInt(text));
                done();
            });
        });
    });
});




