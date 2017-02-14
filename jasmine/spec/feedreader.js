/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
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
      /* Write a test that loops through each feed
      * in the allFeeds object and ensures it has a URL defined
      * and that the URL is not empty.
      */
      allFeeds.forEach(function(feeds){
        it("passes if each feed's URL is defined and not empty",function(){
          expect(feeds.url).toBeDefined();
          expect(feeds.url).not.toBe('');
        });
      });
      /* Write a test that loops through each feed
      * in the allFeeds object and ensures it has a name defined
      * and that the name is not empty.
      */
      allFeeds.forEach(function(feeds){
        it("passes if each feeds name is defined and not empty",function(){
          expect(feeds.name).toBeDefined();
          expect(feeds.name).not.toBe('');
          expect(feeds.name.length).toBeGreaterThan(0);
        });
      });
    });
    /* Write a new test suite named "The menu" */

    /* Write a test that ensures the menu element is
    * hidden by default.
    */
    var bodyElem = $("body");
    describe('The menu',function(){
      it("test if the menu is hidden by default",function(){
        expect(bodyElem.hasClass("menu-hidden")).toBe(true);
      });
    /* Write a test that ensures the menu changes
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
    /* Write a new test suite named "Initial Entries" */
    /* Write a test that ensures when the loadFeed
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
        expect($(".feed .entry").length).toBeGreaterThan(0);
      });
    });
    /* Write a new test suite named "New Feed Selection"
    /* Write a test that ensures when a new feed is loaded
    * by the loadFeed function that the content actually changes.
    * Remember, loadFeed() is asynchronous.
    */
    describe("New Feed Selection",function(){
      var oldEntry;
      var newEntry;
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
