/**
 * Unit tests for page widget
 *
 */
describe("testing a page widget", function() {
  var templateEngine = engine.getInstance();

  beforeEach(function() {
    this.pages = document.createElement('div');
    this.pages.setAttribute('id', 'pages');
    document.body.appendChild(this.pages);
  });

  afterEach(function() {
    document.body.removeChild(this.pages);
    this.pages = null;
  });

  it("should test that invisible pages generate no DOM string", function() {

    expect(this.createTestWidgetString("page", {'visible': "false"})[1]).toBe(undefined);

  });

  it("should test the page creator", function() {
    var res = this.createTestWidgetString("page", {'name': 'Testpage'}, "<label>Test</label>");
    var pageLink = res[0];
    var page = cv.structure.WidgetFactory.getInstanceById(pageLink.getPath()+"_");
    expect(page.getPageType()).toBe("text");

    var widget = $(res[1]);
    cv.structure.pure.Page.createFinal();
    expect(widget).toHaveClass('pagelink');

    var elem = $(page.getDomElement());
    expect(elem).toHaveClass("type_text");
    expect($(elem.find('h1')).text()).toBe("Testpage");
  });

  it("should test the page creator with some attributes", function() {

    var res = this.createTestWidgetString("page", {
      'flavour': 'potassium',
      'bind_click_to_widget': 'true',
      'align': 'right',
      'showtopnavigation': 'true',
      'showfooter': 'true',
      'shownavbar-top': 'true',
      'shownavbar-left': 'true',
      'shownavbar-bottom': 'true',
      'shownavbar-right': 'true'
    });
    var pageLink = res[0];
    var page = cv.structure.WidgetFactory.getInstanceById(pageLink.getPath()+"_");

    var widget = $(res[1]);
    var actor = $(widget.find(".actor").get(0));
    expect(actor.css('text-align')).toBe('right');
    cv.structure.pure.Page.createFinal();

    expect(page.getShowTopNavigation()).toBeTruthy();
    expect(page.getShowFooter()).toBeTruthy();
    expect(page.getShowNavbar().top).toBeTruthy();
    expect(page.getShowNavbar().bottom).toBeTruthy();
    expect(page.getShowNavbar().left).toBeTruthy();
    expect(page.getShowNavbar().right).toBeTruthy();

    var page = $($('.page', '#pages')[0]);
    expect(page).toHaveClass("flavour_potassium");
  });

  it("should test the 2d-page creator with contained svg backdrop", function() {

    var res = this.createTestWidgetString("page", {
      'type': '2d',
      'size': 'contained',
      'backdropalign': 'left',
      'backdrop': 'test.svg'
    });
    var pageLink = res[0];
    var page = cv.structure.WidgetFactory.getInstanceById(pageLink.getPath()+"_");
    cv.structure.pure.Page.createFinal();

    expect(page.getBackdropAlign()).toBe("left");

    page = $($('.page', '#pages')[0]);

    expect(page).toHaveClass("type_2d");
    var backdrop = page.find('embed')[0];
    expect(backdrop).toHaveStyleSetting('width', '100%');
    expect(backdrop).toHaveStyleSetting('height', '100%');
    expect(backdrop).toHaveStyleSetting('object-fit', 'contain');
    expect(backdrop).toHaveStyleSetting('object-position', 'left');
    expect($(backdrop).attr('src')).toBe('test.svg');
  });

  it("should test the 2d-page creator with fixed png backdrop", function() {

    var res = this.createTestWidgetString("page", {
      'type': '2d',
      'size': 'fixed',
      'backdrop': 'test.png'
    });

    cv.structure.pure.Page.createFinal();

    var page = $($('.page', '#pages')[0]);

    expect(page).toHaveClass("type_2d");
    var backdrop = page.find('img')[0];

    expect($(backdrop).attr('src')).toBe('test.png');
  });

  it("should test the page update", function() {
    spyOn(templateEngine.visu, 'write');
    spyOn(templateEngine, 'scrollToPage');

    var res = this.createTestWidgetString("page", {
      'type': 'text',
      'ga': '1/0/0',
      'name': 'Testpage'
    });
    var pageLink = res[0];
    var page = cv.structure.WidgetFactory.getInstanceById(pageLink.getPath()+"_");
    cv.structure.pure.Page.createFinal();

    page.update('1/0/0', 1);
    expect(templateEngine.visu.write).toHaveBeenCalledWith('1/0/0', '80');
    expect(templateEngine.scrollToPage).toHaveBeenCalledWith('Testpage');
  });

  it("should trigger the page action", function() {
    spyOn(templateEngine, 'scrollToPage');

    var res = this.createTestWidgetString("page", {
      'type': 'text',
      'ga': '1/0/0',
      'name': 'Testpage'
    });
    var pageLink = res[0];
    //canceled
    pageLink.action('id_0', null, true);
    expect(templateEngine.scrollToPage).not.toHaveBeenCalled();
    pageLink.action('id_0', null, false);
    expect(templateEngine.scrollToPage).toHaveBeenCalledWith('id_0_');
  });
});