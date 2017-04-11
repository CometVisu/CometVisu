/**
 * @author Tobias Bräutigam
 * @since 2016
 */
describe("testing the meta parser", function() {

  it("should test the meta parser", function () {
    // add footer to document
    var footer = qx.dom.Element.create("div", {"class": 'footer'});
    var body = qx.bom.Selector.query("body")[0];
    qx.dom.Element.insertEnd(footer, body);

    // ugly hack to allow multiline string
    var source = (function() {/*
      <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <meta>
      <plugins>
        <plugin name="colorchooser"/>
        <plugin name="diagram"/>
        <plugin name="strftime"/>
      </plugins>
      <mappings>
        <mapping name="Off_On">
          <entry value="0">Aus</entry>
          <entry value="1">An</entry>
        </mapping>
        <mapping name="Sign">
          <entry range_min="-1e99" range_max="0">Negativ</entry>
          <entry value="0">Null</entry>
          <entry range_min="0" range_max="1e99">Positiv</entry>
        </mapping>
        <mapping name="KonnexHVAC">
          <entry value="auto"><icon name="status_automatic"/>Auto</entry>
          <entry value="comfort"><icon name="status_comfort"/>Komfort</entry>
          <entry value="standby"><icon name="status_standby"/>Stand By</entry>
          <entry value="economy"><icon name="status_night"/>Economy</entry>
          <entry value="building_protection"><icon name="status_frost"/>Haus-Schutz</entry>
        </mapping>
        <mapping name="One1000th">
          <formula>y = x/1000;</formula>
        </mapping>
      </mappings>
      <stylings>
        <styling name="Red_Green">
          <entry value="0">red</entry>
          <entry value="1">green</entry>
        </styling>
        <styling name="Blue_Purple_Red">
          <entry range_min="-100" range_max="0">blue</entry>
          <entry value="0">purple</entry>
          <entry range_min="0" range_max="100">red</entry>
        </styling>
      </stylings>
      <statusbar>
        <status type="html"><![CDATA[
        <img src="icon/comet_64_ff8000.png" alt="CometVisu" /> by <a href="http://www.cometvisu.org/">CometVisu.org</a>
          - <a href="manager.php">Config-Manager</a>
          - <a href=".?config=demo&forceReload=true">Reload</a>
          - <a href=".">Default Config</a>
        ]]></status>
        <status type="html" condition="!edit" hrefextend="config"><![CDATA[
          - <a href="editor/">Edit</a>
          ]]></status>
        <status type="html" hrefextend="config"><![CDATA[
          - <a href="check_config.php">Check Config</a>
          <div style="float:right;padding-right:0.5em">Version: Git</div>
        ]]></status>
      </statusbar>
    </meta>
    */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].trim();
    var xml = qx.xml.Document.fromString(source);
    var parser = new cv.parser.MetaParser();
    parser.parse(xml);

    // check mappings
    expect(cv.Config.hasMapping('Off_On')).toBeTruthy();
    expect(cv.Config.hasMapping('Sign')).toBeTruthy();
    expect(cv.Config.hasMapping('KonnexHVAC')).toBeTruthy();
    expect(cv.Config.hasMapping('One1000th')).toBeTruthy();

    // check stylings
    expect(cv.Config.hasStyling('Red_Green')).toBeTruthy();
    expect(cv.Config.hasStyling('Blue_Purple_Red')).toBeTruthy();

    // test plugins
    var plugins = parser.parsePlugins(xml);
    expect(plugins).toContain("plugin-colorchooser");
    expect(plugins).toContain("plugin-diagram");
    expect(plugins).toContain("plugin-strftime");

    qx.dom.Element.remove(footer);
  });
});