/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         var getFeeds= allFeeds.map(function(item){
           return item;
         });
         var feedsURL = getFeeds.map(function(feeds){
            return feeds.url;
         });
         it("passes if each feed's URL is defined and not empty",function(){
           expect(feedsURL).toBeDefined();
           expect(feedsURL).not.toBe('');
         });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         var feedsName = getFeeds.map(function(feeds){
           var name = feeds.name;
           return name;
         });
        //  feedsName creates a new array with each element's name property, like [nameA,nameB,nameC,nameD]
        // array.join() is required to join all the array elements into a string
         feedsName = feedsName.join("");
         it("passes test if each feed has a name defined and is not empty",function(){
           expect(feedsName).toBeDefined();
           expect(feedsName).not.toBe('');
           expect(feedsName).not.toBe(null);
           expect(typeof feedsName).toEqual('string');
         });
    });


    /* TODO: Write a new test suite named "The menu" */

 var bodyElem = $("body");

        /* TODO: Write a test that ensures the menu element is
         * hidden by default.
         */
         describe('The menu',function(){
           it("test if the menu is hidden by default",function(){
             expect(bodyElem.attr("class")).toContain('menu-hidden');
           });
           /* TODO: Write a test that ensures the menu changes
            * visibility when the menu icon is clicked. This test
            * should have two expectations: does the menu display when
            * clicked and does it hide when clicked again.
            */
           it("test if the menu changes visibility when the menu icon is clicked",function(){
             $(".menu-icon-link").click();
             expect(bodyElem.hasClass("menu-hidden")).toEqual(false);
             $(".menu-icon-link").click();
             expect(bodyElem.hasClass("menu-hidden")).toEqual(true);
           });
         });


    /* TODO: Write a new test suite named "Initial Entries" */
    /* TODO: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
      describe("Initial Entries",function(){
        beforeEach(function(done){
          loadFeed(0,done);

        });
        it("test the loadFeed function is called asynchonously and completes its work",function(){
          expect($(".feed .entry")).not.toBe('');
          expect($(".feed .entry")).not.toBe(null);
          expect($(".feed .entry")).toBeDefined();
          expect($(".feed .entry").length).toBeGreaterThan(0);
        });
      });
      var oldEntry;
      var newEntry;
      /* TODO: Write a new test suite named "New Feed Selection"

          /* TODO: Write a test that ensures when a new feed is loaded
           * by the loadFeed function that the content actually changes.
           * Remember, loadFeed() is asynchronous.
           */
      describe("New Feed Selection",function(){
        beforeEach(function(done){
            loadFeed(1,function(){
              oldEntry = $(".feed").find(".entry").text();
              done();
            });
        });
        it("test if the feeds content changes",function(done){
          loadFeed(2,function(){
            newEntry = $(".feed").find(".entry").text();
            expect(oldEntry).not.toBe(newEntry);
            done();
          });
        });

      });

}());
