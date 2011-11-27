var CometEditor = function() {
    var Editor = this;
    Editor.cache = {};

    
    Editor.cacheServerData = function(url, variable) {
        // get all GAs from the server
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            success: function(data) {
                Editor.cache[variable] = data;
                switch( variable )
                {
                  case 'addresses':
                    // Sort list of addresses in each HG/MG
                    for( var hg in Editor.cache.addresses )
                    {
                      for( var mg in Editor.cache.addresses[hg] )
                      {
                        Editor.cache.addresses[hg][mg].sort( function(a,b){
                          return a.address.split('/')[2] - b.address.split('/')[2];
                        });
                      }
                    }
                    break;
                }
            },
            error: function(xhr, textStatus, e) {
                Editor.cache[variable] = false;
                $("#StatusBar").jnotifyAddMessage({
                    text: lingua("bad_get_" + variable, textStatus + " " + e),
                    permanent: false,
                    type: "error",
                    disappearTime: 30000
                });
            }
        });
    }
    
    Editor.refreshEditor = function(val) {
        // the type has been changed
        // we need to change the input-field accordingly to match
        // what attributes we need


        // get all the info we need to edit this piece of work
        var creator = design.getCreator(val);
        var attributes = creator.attributes || {};
        var elements   = creator.elements || {};

        // find old input-fields in the editor to remember those values ...
        // this is need in case someone switches types while editing - and sure they want to keep their settings
        var container = $("#addMaster div.inputs");
        var values = $.extend({}, $("#addMaster").data("widgetdata"));

        if (!$("#pages .inedit").is(".widget")) {
            // this needs to be changed for the new settings-layout - it's completely broken right now!
            // alte Werte zwischenspeichern
            container.find(":input").each(function() {
                if ($(this).val() != "") {
                    var name = $(this).data("name");
                    values[name] = $(this).val();
                }
            })
        }
        container.empty();

        // we will need this variable later on to store our fieldset in.
        var set;
        if (typeof creator.content.type != "undefined" && creator.content.type == "string") {

            var element = $("<div />").addClass("add_input").addClass("content")
                        .append($("<label />").attr("for", "add_textContent").html("text-content"))
                        .append($("<div class=\"input\" />")
                            .append($("<input type=\"text\" id=\"add_textContent\"/>"))
                            );
            if (typeof values["textContent"] != "undefined") {
                element.find("input").val(values["textContent"]);
            }

            element.find(":input").data("required", creator.content.required);

            container.append(element);
            delete element;
        }

        if (false === jQuery.isEmptyObject(elements)) {
            // we've got elements we need to addit :)
            container.append(set = jQuery("<fieldset />").addClass("elements"));
            jQuery.each(elements, function(index, e) {
                var $line = $("<div />").addClass("add_input")
                    .append($("<label />").attr("for", "add_" + index).html(index))
                    .append($("<div class=\"input\" />"));
                var $input = $line.find("div.input");

                switch (e.type) {
                    case "address":
                        // create a fake input-element to store our data later on
                        $input.append(jQuery("<input type=\"hidden\" id=\"add_" + index + "\" class=\"multi address\" />"));

                        // create the real inputs-thingy-thing
                        $input.append('<div><div class="add_element">+</div><div class="multi_element address" /></div>');
                        $input.find(".add_element").click(function() {
                            // insert a new, empty sub-element
                            var objData = {};
                            // don't try to hide it: this is hardcoded and works for addresses only
                            objData.type = "address";
                            objData.textContent = "";
                            objData._attributes = {};
                            objData._attributes.transform = "";
                            objData._attributes.variant = "";
                            objData._attributes.readonly = false;

                            var elementDiv = HTMLLayer.createAddressEditorElement(objData);
                            $input.find("div.multi_element").append(elementDiv);
                        });

                        if (typeof values._elements != "undefined"
                            && typeof values._elements[index] != "undefined") {
                            $.each(values._elements[index], function(i, e) {
                                var elementDiv = HTMLLayer.createAddressEditorElement(e);
                                $input.find("div.multi_element").append(elementDiv);
                            });
                        }
                        break;
                    default:
                        // add an unknown element (e.g. the label)
                        if (e.multi == false) {
                            // this element can appear only once
                            $input.append(jQuery("<input type=\"text\" id=\"add_" + index + "\" />"));

                            if (typeof values._elements != "undefined"
                                && typeof values._elements[index] != "undefined") {
                                $.each(values._elements[index], function(i, e) {
                                    $input.find("input").val(values._elements[index][0].textContent);
                                });
                            }
                        } else {
                            // handling for "if an element can appear more than once"
                            // TODO: needs to be coded once someone wants to use it :)
                        }
                        break;
                }

            // remember how to name and how to validate this input
            $line.find(":input")
                    .data("name", index)
                    .data("required", e.required)
                    .data("type", e.type);

            // add this "line" to the editor
            set.append($line);
            delete $line;
            });
        }

        if (false === jQuery.isEmptyObject(attributes)) {
            // we've got attributes to addit :)
            container.append(set = jQuery("<fieldset />").addClass("attributes"));
            $.each(attributes, function (index, e) {
                var $line = $("<div />").addClass("add_input")
                                    .append($("<label />").attr("for", "add_" + index).html(index))
                                    .append($("<div class=\"input\" />"));
                var $input = $line.find("div.input");

                switch (e.type) {
                    case "mapping":
                        $input.append($("<select id=\"add_mapping\" />")
                                        .append($("<option />").attr("value", "").html("-")));
                        jQuery.each(mappings, function(i, tmp) {
                            $input.find("select#add_mapping").append($("<option />").attr("value", i).html(i));
                        });

                        if (typeof values._attributes != "undefined"
                            && typeof values._attributes[index] != "undefined") {
                            $input.find("option[value=" + values._attributes[index] + "]").attr("selected", "selected");
                        }

                        break;

                    case "styling":
                        $input.append($("<select id=\"add_styling\" />")
                                        .append($("<option />").attr("value", "").html("-")));
                        jQuery.each(stylings, function(i, tmp) {
                            $input.find("select#add_styling").append($("<option />").attr("value", i).html(i));
                        });

                        if (typeof values._attributes != "undefined"
                            && typeof values._attributes[index] != "undefined") {
                            $input.find("option[value=" + values._attributes[index] + "]").attr("selected", "selected");
                        }

                        break;
                    case "datatype":
                        break;
                    case "list":
                        $input.append($("<select id=\"add_" + index + "\" />")
                                        .append($("<option />").attr("value", "").html("-")));
                        jQuery.each(e.list, function (i, val) {
                            $input.find("select#add_" + index).append($("<option />").attr("value", i).html(val));
                        });

                        if (typeof values._attributes != "undefined"
                            && typeof values._attributes[index] != "undefined") {
                            $input.find("option[value=" + values._attributes[index] + "]").attr("selected", "selected");
                        }

                        break;
                    default:
                        $input.append($("<input type=\"text\" id=\"add_" +  index + "\" />"));

                        if (typeof values._attributes != "undefined"
                            && typeof values._attributes[index] != "undefined") {
                            $input.find("input").val(values._attributes[index]);
                        }

                        break;
                }

                if ($line.find("select")[0]) {
                    var select = $line.find("select");
                    select.change(function() {
                        // update the input-field
                        jQuery(this).parent().find("input").val(jQuery(this).val());
                    })
                }

                $line.find(":input")
                        .data("name", index)
                        .data("required", e.required)
                        .data("type", e.type);

                set.append($line);
                delete $line;
            });
        }
    }
    
    
    Editor.saveElement = function() {
        // Daten aus den Eingabefeldner übernehmen
        // einfach alle rein - wir haben ja nur die passenden Felder

        var container = $("#addMaster div.inputs");

        // dataObject needs to be a real dom-object, so we need to go all the
        // way through parsing an xml-string ...
        var name = jQuery("#addMaster #add_type").val();
        var text = container.find("#add_textContent:input").val();
        var xml = "<" + name + ">" + text + "</" + name + ">";
        var dataObject;

        if (window.DOMParser) {
            var parser = new DOMParser();
            dataObject = parser.parseFromString(xml, "text/xml");
        } else {
            // Internet Explorer
            dataObject = new ActiveXObject("Microsoft.XMLDOM");
            dataObject.async="false";
            dataObject.loadXML(xml);
        }

        dataObject = jQuery(dataObject.documentElement);
        if (typeof (dataObject.nodeName) == "undefined" || dataObject.nodeName == "") {
            dataObject.nodeName = name;
        }
        if (typeof (text) != "undefined"
            && (typeof (dataObject.textContent) == "undefined" || dataObject.textContent == "")) {
            dataObject.textContent = text;
        }

        var error = false;

        // get the settings for all sub-elements
        container.find("fieldset.elements :input").each(function() {
            var name = $(this).data("name");

            if (!$(this).is(".multi")) {
                if ($(this).val() != "") {
                    // validating
                    if (false === Editor.validateInput($(this).val(), $(this).data("type"))) {
                        $('#StatusBar').jnotifyAddMessage({
                            text: lingua("value_invalid", name),
                            permanent: false,
                            type: 'error'
                        });
                        // do not save
                        error = true;
                    }
                    dataObject.append($("<" + name + " />").append($(this).val()));
                } else if ($(this).data("required") === true) {
                    // do not save
                    $('#StatusBar').jnotifyAddMessage({
                        text: lingua("value_required", name),
                        permanent: false,
                        type: 'error'
                    });
                    error = true;
                }
            } else {
                // multi-element-input
                if ($(this).is(".address")) {
                    $elements = jQuery(this).closest("div.input").find(".multi_element .element");
                    $elements.each(function (index, e) {
                        $address = $("<address />")
                            .attr("transform", $(e).data("transform"))
                            .attr("variant", $(e).data("variant"))
                            .attr("readonly", $(e).data("readonly") == true ? "true" : "false")
                            .append($(e).data("address"));
                        dataObject.append($address);
                    });
                }
            }
        });

        // get the settings for all attributes
        container.find("fieldset.attributes :input").each(function() {
            var name = $(this).data("name");

            if ($(this).val() != "") {
                // validating
                if (false === Editor.validateInput($(this).val(), $(this).data("type"))) {
                    $('#StatusBar').jnotifyAddMessage({
                        text: lingua("value_invalid", name),
                        permanent: false,
                        type: 'error'
                    });
                    // do not save
                    error = true;
                }
                dataObject.attr(name, $(this).val());
            } else if ($(this).data("required") === true) {
                // do not save
                $('#StatusBar').jnotifyAddMessage({
                    text: lingua("value_required", name),
                    permanent: false,
                    type: 'error'
                });
                error = true;
            }
        });

        if (error !== false) {
            return;
        }

        // als path verwenden wir einfach den aktuellen UNIX-Timestamp
        // der wird nicht schon belegt sein
        var path = $(".page:visible:last").attr("id");
        path = path + "_" + new Date().getTime();
        var newWidget = create_pages(dataObject, path);

        // falls es eine page war dann muss die HINTER das aktuelle Element
        $("#" + path + ".page").insertAfter($(".page:visible:last"));

        if ($("#pages .inedit").is(".widget")) {
            $("#pages .inedit").replaceWith(newWidget);
        } else {
            jQuery(".page:visible:last > div").append(newWidget);
        }
        jQuery("#pages").triggerHandler("done");

        // und dann noch mich wieder verstecken
        jQuery("#addMaster").trigger("hide").trigger("cleanup");

    };
    
    Editor.validateInput = function (val, type) {
        /**
         * check whether a user-given value matches the type-criterias and thus is valid
         */

        if (typeof type == "undefined" || type == null) {
            // nicht mit Geistern rumschlagen
            return true;
        }
        if (typeof type == "object") {
            // wohl ein regulärer Ausdruck
            try {
                if (val.match(type)) {
                    return true;
                } else {
                    return false;
                }

            } catch (e) {
                $('#StatusBar').jnotifyAddMessage({
                    text: lingua("regexp_invalid", name),
                    permanent: false,
                    type: 'error'
                });
                return false;
            }
        }

        switch (type) {
            case "address":
                return Boolean(val.match(/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{1,3}$/) != null);
                break;
            case "datatype":
            case "numeric":
                return Boolean(val.match(/^-?\d+([\.,]\d+)?$/g));
                break;
            case "string":
            case "uri":
                return Boolean(typeof val == "string");
                break;
            case "mapping":
                return Boolean(typeof mappings[val] != "undefined");
                break;
            case "styling":
                return Boolean(typeof stylings[val] != "undefined");
                break;
        }
    }
    
    Editor.saveConfig = function() {
        var configData = Editor.createObjectFromPage("#0.page");
        var configDataJSON = JSON.stringify(configData);
        delete configData;

        var configSuffix = "";
        if ($.getUrlVar("config")) {
            configSuffix = "_" + $.getUrlVar("config");
        }

        $.ajax({
            type: "POST",
            data: {data: configDataJSON, config: configSuffix},
            url: "edit/save_config.php",
            cache: false,
            dataType: "json",
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $('#StatusBar').jnotifyAddMessage({
                    text: lingua("save_bad", errorThrown),
                    permanent: false,
                    type: 'error',
                    disappearTime: 30000
                });
            },
            success: function(data, textStatus, XMLHttpRequest) {
                if (data != 1) {
                    $('#StatusBar').jnotifyAddMessage({
                        text: lingua("save_bad", data),
                        permanent: false,
                        type: 'error',
                        disappearTime: 30000
                    });
                    return;
                }
                $('#StatusBar').jnotifyAddMessage({
                    text: lingua("save_good"),
                    permanent: false,
                    type: 'message'
                });
            }
        });
    }
    
    Editor.getWidgetData = function(element, nodive) {
        var myObj = {};

        var e = $(element);

        myObj._type = e.data("nodeName");
        myObj.textContent = e.data("textContent");
        myObj._attributes = e.data("configData").attributes;

        if (e.data("configData").elements) {
            // Sub-Elements must be processed differently.
            var myElements = {};
            $.each(e.data("configData").elements, function (index, elementGroup) {
                $.each(elementGroup, function (index, element) {
                    var myElement = {};
                    element = jQuery(element).get(0);
                    switch (element.nodeName) {
                        case "address":
                            myElement._type = "address";
                            myElement.textContent = element.textContent;

                            myElement._attributes = {};

                            myElement._attributes.transform = jQuery(element).attr("transform");
                            myElement._attributes.readonly  = jQuery(element).attr("readonly");
                            myElement._attributes.variant  = jQuery(element).attr("variant") || "";
                            break;
                        default:
                            // mostly labels
                            myElement._type = element.nodeName;
                            myElement.textContent = element.textContent;
                            break;
                    }
                    if (typeof(myElements[element.nodeName]) == "undefined") {
                        myElements[element.nodeName] = [];
                    }
                    myElements[element.nodeName].push(myElement);
                });
            });
            // add it to the object-to-be-saved
            myObj._elements = myElements;
        }

        if (e.is(".pagelink")) {
            // it's a page, we need to dive in
            // eine Sub-Seite
            // versuchen die Seiten-Id durch den Link zu bekommen
            var s = e.find("a");
            var href = s.attr("href");
            var matches = href.match(/(\d+_)*\d+/);

            var subElements = new Array();
            if (matches && (typeof nodive == "undefined" || !nodive)) {
                // wenn wir eine Id haben, dann suchen wir die Seite
                // und serialisieren sie auch
                var page = $("#pages").find("#" + matches[0] + ".page");
                var subObject = Editor.createObjectFromPage(page);
                if (subObject._elements.length > 0) {
                    myObj = subObject;
                }
            }
        }

        return myObj;
    }
    
    Editor.createObjectFromPage = function(pageObject) {
        var obj = {};
        var elements = new Array();
        $(pageObject).find("h1, .widget").each(function(index, element) {
            if ($(element).is("h1")) {
                // Seitenname
                obj.name = $(element).text();
                obj._type = "page";
                if ($(element).parents("div.page").data("configData")) {
                    var data = $(element).parents("div.page").data("configData");
                    obj = jQuery.extend(obj, data.attributes);
                }
            } else {
                var myObj = {};
                myObj = Editor.getWidgetData(element);
                if (typeof myObj != "undefined" && typeof myObj._type != "undefined") {
                    elements.push(myObj);
                }
            }

        });

        obj._elements = elements;
        return obj;
    }
    
    Editor.getAddressesObject = function() {

        if (typeof Editor.cache.cachedAddressesObject == "object") {
            return Editor.cache.cachedAddressesObject.clone();
        }

        element = $("<select />");

        $.each(Editor.cache.addresses, function(hg, sub) {
            $.each(sub, function(mg, addresses) {
                element.append(
                    $("<optgroup />").attr("label", hg + " - " + mg)
                );
                $.each(addresses, function (i, address) {
                    element.find("optgroup:last")
                        .append($("<option />").attr("value", address.address)
                                    .addClass("dpt_DPT:" + address.dpt)
                                    .html(address.address + ': ' + address.name)
                                    )
                });
            });
        });

        Editor.cache.cachedAddressesObject = element.children();

        return Editor.cache.cachedAddressesObject;
    }

    Editor.getDPTObject = function() {

        if (typeof Editor.cache.cachedDPTObject == "object") {
            return Editor.cache.cachedDPTObject.clone();
        }

        var element = $("<select />");

        var lastMajor = "";

        $.each(Editor.cache.dpts, function(i, dptDefinition) {
            var myMajor = lastMajor;
            var t = dptDefinition.dpt.match(/^([0-9]+)\./);
            if (typeof (t[1]) != "undefined") {
                myMajor = t[1];
            }

            if (lastMajor != myMajor) {
                if (element.is("optgroup")) {
                    element = element.closest("select");
                }
                element.append($("<optgroup />").attr("label", "DPT " + myMajor));
                lastMajor = myMajor;
            }

            element.find("optgroup:last").append($("<option />").attr("value", "DPT:" + dptDefinition.dpt)
                    .html("" + dptDefinition.dpt + ": " + dptDefinition.name)
                    );
        });

        Editor.cache.cachedDPTObject = element.children();

        return Editor.cache.cachedDPTObject;
    }

};

var CometEditorHTMLLayer = function() {
    
    var Layer = this;
    
    /**
     * Create a sub-element for the multi-editor to edit an address-entry.
     */
    Layer.createAddressEditorElement = function(elementData) {
        var elementDiv = jQuery("<div class=\"element clearfix\" />");
        elementDiv.append("<div class=\"title\" />")
            .append("<div class=\"value editable\" />")
            .append("<div class=\"transform editable\" />")
            .append("<div class=\"variant editable\" />")
            .append("<div class=\"readonly editable\" />");
        //myDiv.find(".title").append();
        var t = Editor.getAddressesObject();
        elementDiv.find(".title").append(t.find("option[value=" + elementData.textContent + "]").text());
        elementDiv.find(".value").append(elementData.textContent);
        elementDiv.find(".transform").append(elementData._attributes.transform);
        if (elementData._attributes.variant != "undefined" && elementData._attributes.variant != "") {
            elementDiv.find(".variant").append(elementData._attributes.variant).show();
        } else {
            elementDiv.find(".variant").hide();
        }
        elementDiv.find(".readonly").append(elementData._attributes.readonly == "true" ? "readonly" : "")

        elementDiv.data("transform", elementData._attributes.transform)
            .data("variant", elementData._attributes.variant)
            .data("readonly", elementData._attributes.readonly == "true" ? true : false)
            .data("address", elementData.textContent);

        return elementDiv;
    }
}