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


    /* Test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('have URL defined', function() {

      allFeeds.forEach(function(feed) {

        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);

      })
    });


    /* Test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('have name defined', function() {

      allFeeds.forEach(function(feed) {

        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);

      })
    });
  });

  /* This suite is all about tests on "The menu". */
  describe('The menu', function() {

    // Stores the menu icon button.
    var menuIcon = $('.menu-icon-link');

    /* Test that ensures the menu element is
     * hidden by default.
     */
    it('is hidden by default', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    /* Test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('menu changes visibility when the menu icon is clicked', function() {

      // Simulate click event on the menuIcon using trigger() method.
      menuIcon.trigger('click');

      // Menu should be visible.
      expect($('body').hasClass('menu-hidden')).toBe(false);

      // Simulate another click event on the menuIcon using trigger() method.
      menuIcon.trigger('click');

      // Menu should be hidden.
      expect($('body').hasClass('menu-hidden')).toBe(true);

    });
  });

  /* This suite is all about tests on entries returned from API. */
  describe('Initial Entries', function() {
    /* Test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */

    /* Wait for the server to respond first,
     * and then run the test.
     */
    beforeEach(function(done) {

      /* Send request to server with an id of feedList = 0 for example.
       * Using 0 we request response from Udacity Blog. Check allFeeds[] in app.js.
       */
      loadFeed(0, function() {

        // When the response is ready, close the function.
        done();
      });
    });

    /* This test ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    it('should have at least one entry', function(done) {

      // There should be at least one element with class "entry".
      expect($('.feed').find('.entry').length).not.toBe(0);

      done();
    });
  });

  /* This suite is all about tests on New Feed Selection. */
  describe('New Feed Selection', function() {

    /* Will store the visialised content,
     * build from the server responses
     * in "Initial Entries" suite above,
     * or the default content.
     */
    var previousContent = $('.feed').text();

    /* Wait for the server to respond first,
     * and then run the test.
     */
    beforeEach(function(done) {

      /* Send request to server with an id of feedList = 1 for example.
       * Using 1 we request response from CSS Tricks. Check allFeeds[] in app.js.
       * This request is different from the one in "Initial Entries" suite above,
       * so it should return different content.
       */
      loadFeed(1, function() {

        // When the response is ready, close the function.
        done();
      });
    });

    /* Test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */
    it('should change the content', function(done) {

      /* The content build from the response in this suite,
       * should be different from the one build from "Initial Entries" suite
       */
      expect($('.feed').text()).not.toBe(previousContent);

      done();
    });
  });
}());
