/**
 * @author Tobias Bräutigam
 * @since 2016
 */
describe("testing the meta parser", function() {

  it("should test the meta parser", function () {
    // add footer to document
    var footer = qx.dom.Element.create("div", {"class": 'footer'});
    var body = document.querySelector("body");
    body.appendChild(footer);

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
        <mapping name="Motion_name">
                <entry value="Motion_FF_Corridor">Flur OG</entry>
                <entry value="Motion_FF_Kitchen">Küche</entry>
                <entry value="Motion_FF_Dining">Esszimmer</entry>
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
      <notifications>
            <state-notification name="motion" target="notificationCenter" unique="true" severity="high">
                <title-template>Bewegungsalarm</title-template>
                <message-template>Bewegung erkannt: {{ address }}, {{ time }}</message-template>
                <condition>ON</condition>
                <addresses address-mapping="Motion_name">
                    <address transform="OH:switch">Motion_FF_Dining</address>
                    <address transform="OH:switch">Motion_FF_Corridor</address>
                    <address transform="OH:switch">Motion_FF_Kitchen</address>
                </addresses>
            </state-notification>
        </notifications>
      <statusbar>
        <status type="html"><![CDATA[
        <img src="resource/icons/comet_64_ff8000.png" alt="CometVisu" /> by <a href="http://www.cometvisu.org/">CometVisu.org</a>
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
      <templates>
        <template name="test"><text><label>Test template</label></text></template>
      </templates>
    </meta>
    */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].trim();
    var xml = qx.xml.Document.fromString(source);
    var parser = new cv.parser.MetaParser();
    parser.parse(xml, function () {

      // check mappings
      expect(cv.Config.hasMapping('Off_On')).toBeTruthy();
      expect(cv.Config.hasMapping('Sign')).toBeTruthy();
      expect(cv.Config.hasMapping('KonnexHVAC')).toBeTruthy();
      expect(cv.Config.hasMapping('One1000th')).toBeTruthy();
      expect(cv.Config.hasMapping('Motion_name')).toBeTruthy();

      // check stylings
      expect(cv.Config.hasStyling('Red_Green')).toBeTruthy();
      expect(cv.Config.hasStyling('Blue_Purple_Red')).toBeTruthy();

      // test plugins
      var plugins = parser.parsePlugins(xml);
      expect(plugins).toContain("plugin-colorchooser");
      expect(plugins).toContain("plugin-diagram");
      expect(plugins).toContain("plugin-strftime");

      // test notifications
      var router = cv.core.notifications.Router.getInstance();
      var config = router.getStateMessageConfig();

      expect(config.hasOwnProperty("Motion_FF_Dining")).toBeTruthy();
      expect(config.hasOwnProperty("Motion_FF_Corridor")).toBeTruthy();
      expect(config.hasOwnProperty("Motion_FF_Kitchen")).toBeTruthy();

      // state listeners must be set
      var model = cv.data.Model.getInstance();
      ["Motion_FF_Dining", "Motion_FF_Corridor", "Motion_FF_Kitchen"].forEach(function(address) {
        expect(model.getStateListener().hasOwnProperty(address)).toBeTruthy();
        expect(model.getStateListener()[address].length).toEqual(1);
      });

      // template
      expect(cv.parser.WidgetParser.getTemplates().hasOwnProperty('test')).toBeTruthy();
      expect(cv.parser.WidgetParser.getTemplates().test.trim()).toEqual('<root><text><label>Test template</label></text></root>');

      footer.parentNode.removeChild(footer);
    });
  });
});
