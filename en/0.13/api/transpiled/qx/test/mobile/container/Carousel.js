(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.mobile.MobileTestCase": {
        "require": true
      },
      "qx.ui.mobile.container.Carousel": {},
      "qx.ui.mobile.container.Composite": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christopher Zuendorf (czuendorf)
  
  ************************************************************************ */

  qx.Class.define("qx.test.mobile.container.Carousel", {
    extend: qx.test.mobile.MobileTestCase,
    members: {
      testInit: function testInit() {
        var carousel = new qx.ui.mobile.container.Carousel(0.4);
        this.getRoot().add(carousel);
        carousel.destroy();
      },
      testAddCarouselPage: function testAddCarouselPage() {
        var carousel = new qx.ui.mobile.container.Carousel();
        var carouselPage = new qx.ui.mobile.container.Composite();
        carousel.add(carouselPage);
        this.getRoot().add(carousel);
        carousel.destroy();
        carouselPage.destroy();
      },
      testRemoveCarouselPage: function testRemoveCarouselPage() {
        var carousel = new qx.ui.mobile.container.Carousel();
        var carouselPage = new qx.ui.mobile.container.Composite();
        carousel.add(carouselPage);
        carousel.removePageByIndex(0);
        this.getRoot().add(carousel);
        carousel.destroy();
        carouselPage.destroy();
      },
      testPageSwitch: function testPageSwitch() {
        var carousel = new qx.ui.mobile.container.Carousel();
        var carouselPage1 = new qx.ui.mobile.container.Composite();
        carousel.add(carouselPage1);
        var carouselPage2 = new qx.ui.mobile.container.Composite();
        carousel.add(carouselPage2);
        this.getRoot().add(carousel);
        this.assertEquals(0, carousel.getCurrentIndex());
        carousel.nextPage();
        this.assertEquals(1, carousel.getCurrentIndex());

        // OVERFLOW
        carousel.nextPage();
        this.assertEquals(1, carousel.getCurrentIndex());
        carousel.previousPage();
        this.assertEquals(0, carousel.getCurrentIndex());

        // OVERFLOW
        carousel.previousPage();
        this.assertEquals(0, carousel.getCurrentIndex());
        carousel.destroy();
        carouselPage1.destroy();
        carouselPage2.destroy();
      },
      testPageSwitchEvent: function testPageSwitchEvent() {
        var carousel = new qx.ui.mobile.container.Carousel();
        var carouselPage1 = new qx.ui.mobile.container.Composite();
        carousel.add(carouselPage1);
        var carouselPage2 = new qx.ui.mobile.container.Composite();
        carousel.add(carouselPage2);
        this.getRoot().add(carousel);
        this.assertEventFired(carousel, "changeCurrentIndex", function () {
          carousel.nextPage();
        }, function (e) {
          this.assertEquals(1, e.getData());
          this.assertEquals(0, e.getOldData());
        }.bind(this));
        this.assertEventFired(carousel, "changeCurrentIndex", function () {
          carousel.previousPage();
        }, function (e) {
          this.assertEquals(0, e.getData());
          this.assertEquals(1, e.getOldData());
        }.bind(this));
        carousel.destroy();
        carouselPage1.destroy();
        carouselPage2.destroy();
      },
      testScrollToPage: function testScrollToPage() {
        var carousel = new qx.ui.mobile.container.Carousel();
        var carouselPage1 = new qx.ui.mobile.container.Composite();
        carousel.add(carouselPage1);
        var carouselPage2 = new qx.ui.mobile.container.Composite();
        carousel.add(carouselPage2);
        this.getRoot().add(carousel);
        this.assertEquals(0, carousel.getCurrentIndex());
        carousel.setCurrentIndex(1);
        this.assertEquals(1, carousel.getCurrentIndex());
        window.setTimeout(function () {
          carousel.destroy();
          carouselPage1.destroy();
          carouselPage2.destroy();
        }, 600);
      }
    }
  });
  qx.test.mobile.container.Carousel.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Carousel.js.map?dt=1726089055715