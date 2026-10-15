Automated tests
====================

The CometVisu uses two types of automated software tests: unittests and
end-to-end tests. Unittest is about testing individual functions within the
source code. If you e.g. has an `add` function that adds two numbers, then a
unit test calls this function, passes two numbers to it and checks if the
result is correct.

End-to-end tests tend to examine the "big picture" and simulate user
retention. In this case, the CometVisu is opened fully automated in a
browser and the tests operate the Visu as a user and check whether an action
causes the desired changes. For example, one can Check if clicking on a
switch returns the appropriate value to the backend and if the backend
provides an update for the switch, it displays this accordingly.

Unittests
---------

The test runner for the tests is `Karma <https://karma-runner.github.io>`__.
The tests are executed via the command line tool Grunt. If you have not
already done so, the following commands must be executed in the root
directory of the CometVisu project for preparation.

.. code-block:: bash

    npm install
    sudo npm -g install grunt-cli


The existing unit tests can then be executed with the following command:

.. code-block:: bash

    grunt karma:ci


This carries out the tests including a code coverage analysis. The code
coverage shows as a result of how many percent of the source code was
covered by tests, the output looks like this:

.. code-block:: bash

    =============================== Coverage summary ===============================
    Statements   : 42.14% ( 1308/3104 )
    Branches     : 32.35% ( 584/1805 )
    Functions    : 46.99% ( 211/449 )
    Lines        : 41.8% ( 1233/2950 )
    ================================================================================


For a more detailed coverage report, see
``./coverage/<browser-name>/index.html``.Where the browser name escapes that of
the executing browser. Currently this is the headless testing (Chrome based)
PhantomJS. Theoretically, all browsers installed on the local system are
possible here. In the detailed coverage report, you can navigate down to
individual source code files and see which lines have not yet been tested.
This is very useful to see where the tests still need to be completed.

Write own tests
---------------

The unit tests are written using the Jasmine Framework
`<http://jasmine.github.io/2.4/introduction.html>`__. This makes it
possible to write the tests almost in natural language. The basic
structure of a test looks like this:

.. code-block:: javascript

  describe("My testsuite", function() {
    it("should add two numbers", function() {
    expect(add(4, 5).toBe(9);
    });
  });

This code tests an ``add`` function that simply adds two numbers.

You can find the existing tests in the ``source/test/karma``
subdirectory. If you would like to write a new test for a (fictitious)
source code file under ``source/ui/structure/pure/NewWidget.js``,
you will create the new file
``source/test/karma/ui/structure/pure/NewWidget-spec.js``....

It is important that the name of the test file ends with ``-spec``,
otherwise it will not be found by the testrunner.

The test for this file should now look like this:

.. code-block:: javascript

    describe("testing the new-widget", function() {

      it("should test the creation of a new-widget", function() {
        // Auxiliary function that generates the HTML code of the widget (further help functions can be found in source / test / karma / helper-spec.js)
        // the helper returns an array of 2 elements, the first is the widget object, the second the HTML code as a string
        var res = this.createTestWidgetString("new-widget", {}, "<label>Test</label>");
        // turns the string into a DOM element
        var widget = (function(){var div=document.createElement('div');div.innerHTML=res[1];return div.childNodes[0];})();
        // Widget Object (instance of class cv.ui.structure.pure.NewWidget)
        var obj = res[0];

        // Check if the DOM element has the CSS class newwidget
        expect(widget).toHaveClass('newwidget');
        // Check if the DOM element has a label with the text 'Test'
        expect(widget).toHaveLabel('Test');
        // Check if the widget path is 'id_0'
        expect(obj.getPath()).toBe("id_0");
      });

      it("should test another part of the new-widget", function() {
        // other tests
      });

      ...

    });


As examples of how to write tests and what things to test like,
the existing tests should serve.

