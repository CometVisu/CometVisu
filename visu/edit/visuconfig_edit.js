var lingua = function(element, param) {
    var texts = {
        confirm_delete: "Delete '%s' from this page?",
        confirm_save:   "Save config?",
        prompt_rename:  "Rename page '%s' to ...",
        save_good:      "Config has been successfully saved.",
        save_bad:       "Config not saved. Error: '%s'",
        value_required: "Field '%s' is required but empty. Please correct your input.",
        value_invalid:  "The value for field '%s' is invalid. Please correct your input.",
        regexp_invalid: "There's something wrong with the cable.",
        getaddr_bad:    "Failed to get address-config. Error: '%s'.",
        getdpt_bad:     "Failed to get DPT-config. Error: '%s'.",
        getrrd_bad:     "Failed to get available RRDs. Error: '%s'."
    }

    if (typeof texts[element] == "undefined") {
        return "[unknown text]";
    }

    var myText = texts[element];

    if (typeof param != "undefined") {
        myText = myText.replace(/%s/, param);
    }

    return myText;
}

var addressesCache;
var dptCache;
var rrdCache

jQuery(document).ready(function() {

    $('#StatusBar').jnotifyInizialize({ oneAtTime: false })

    jQuery("div#addwidgetcontrol").bind("click", function() {
        $("#addMaster").triggerHandler("cleanup");
        jQuery("#addMaster").trigger("show").find("#add_type").triggerHandler("change");
    });

    $("#saveconfigcontrol").bind("click", function () {
       saveConfig();
    });

    // get all GAs from the server
    $.ajax({
        url: "edit/get_addresses.php",
        type: "GET",
        dataType: "json",
        success: function(data) {
            addressesCache = data;
        },
        error: function(xhr, textStatus, e) {
            addressesCache = false;
            $('#StatusBar').jnotifyAddMessage({
                text: lingua("getaddr_bad", textStatus + " " +e),
                permanent: false,
                type: 'error',
                disappearTime: 30000
            });
        }
    });

    // get all known dpt from the server
    $.ajax({
        url: "edit/dpt_list.json",
        type: "GET",
        dataType: "json",
        success: function(data) {
             dptCache = data;
        },
        error: function(xhr, textStatus, e) {
            dptCache = false;
            $('#StatusBar').jnotifyAddMessage({
                text: lingua("getdpt_bad", textStatus + " " +e),
                permanent: false,
                type: 'error',
                disappearTime: 30000
            });
        }
    });

    // get all rrds from the server
    $.ajax({
        url: "edit/get_widget_diagram.php",
        type: "GET",
        dataType: "json",
        success: function(data) {
            rrdCache = data;
        },
        error: function(xhr, textStatus, e) {
            rrdCache = false;
            $('#StatusBar').jnotifyAddMessage({
                text: lingua("getrrd_bad", textStatus + " " +e),
                permanent: false,
                type: 'error',
                disappearTime: 30000
            });
        }
    });

    jQuery("#pages").bind("done", function() {
        $("#pages hr, #pages br").each(function() {
            if ($(this).closest(".widget").length == 0) {
                $(this).wrap("<div class=\"widget line\" />");
                var d = $.extend({}, $(this).data());
                $(this).closest("div.widget").data(d);
            }
        });


        jQuery(".page div").sortable({
            handle: ".movecontrol",
            items: '.widget',
            stop: function(event, ui) {
                //console.log(jQuery(this).sortable("toArray"));
                // hier haben wir eine neue Config
            }
        });

        jQuery(".widget").unbind("mouseenter.edit").bind("mouseenter.edit", function() {
            jQuery(this).data("background-color-old", jQuery(this).css("background-color"));
            $(this).prepend(jQuery("<div />").attr("class", "movecontrol"));
            $(this).prepend(jQuery("<div />").attr("class", "editcontrol").html("edit"));
            $(this).prepend(jQuery("<div />").attr("class", "removecontrol").html("x"));
        });

        jQuery(".widget").unbind("mouseleave.edit").bind("mouseleave.edit", function() {
            jQuery(this).css("background-color", jQuery(this).data("background-color-old"));
            jQuery(this).find("div.editcontrol, div.movecontrol, div.removecontrol").remove();
        });

        var options = {};
        $("#addMaster").find("select#add_type").empty();
        jQuery.each(design.creators, function (index, e) {
            if (index == "unknown") {
                // "unknown" is not a good choice for a new widget :)
                return;
            }
            if( design.creators[index].maturity > use_maturity )
            {
                // widget is not mature enough to show in the edior
                return;
            }
            $("#addMaster").find("select#add_type").append(
                $("<option />").attr("value", index).html(index)
            );
        });
    });

    jQuery(".removecontrol").live("click", function() {
        var widget = $(this).parents("div.widget");
        var data = getWidgetData(widget, true);

        var t;
        if (data._type == "page") {
            t = data.name;
        } else {
            t = data.textContent;
        }
        var b = confirm(lingua("confirm_delete", t));
        if (b) {
            widget.remove();
        }
    });


    jQuery(".editcontrol").live("click", function() {
        $("#addMaster").triggerHandler("cleanup");

        var widget = $(this).parents("div.widget");
        if (widget.is(".pagelink")) {
            return renamePage(widget);
        }

        var data = getWidgetData(widget, true);

        // kennzeichnen welches Element grade bearbeitet wird
        widget.addClass("inedit");

        $("#addMaster").data("widgetdata", data);

        $("#addMaster #add_type").find("option[value=" + data._type + "]").attr("selected", "selected");

        $("#addMaster").triggerHandler("show");
    });

    jQuery(".multi_element .element").live("click", function() {
        $this = jQuery(this);
        if ($this.is(".inedit")) {
            // edit-Feld schon vorhanden, leave it alone
            return;
        }
        $this.addClass("inedit");
        $edit = jQuery("<div class=\"clearfix edit\" />");
        $this.append($edit);

        $this.find(".editable").hide().each(function(index, e) {
           $e = jQuery(e);

           if ($this.closest(".multi_element").hasClass("address")) {
                // we're editing addresses
                var element = $("<div />").addClass("add_input").addClass("attribute")
                                    .append($("<label />").attr("for", "add_" + index).html(index))
                                    .append($("<div class=\"input\" />"));
                var myElement = element.find("div.input");

                if ($e.hasClass("value")) {
                    element.find("label").html("address");
                    // we will provide an input-field AND a select-list.
                    myElement.append($("<input class=\"add_address\" />"));
                    if (typeof $e.text() != "undefined") {
                        // pre-set the value
                        myElement.find(":input").val($e.text());
                    }

                    if (typeof addressesCache != undefined && addressesCache != false) {
                        var input = myElement.find("input");
                        input.attr("disabled", "disabled");
                        myElement.append($("<input type=\"checkbox\" name=\"enable_address\" checked=\"checked\" />")
                                            .change(function() {
                                                if ($(this).attr("checked")) {
                                                    input.attr("disabled", "disabled");
                                                    myElement.find("select").show();
                                                } else {
                                                    input.removeAttr("disabled");
                                                    myElement.find("select").hide();
                                                }
                                            })
                                        );
                        myElement.append($("<br />"));
                        myElement.append($("<select class=\"add_address\" />")
                                        .append($("<option />").attr("value", "").html("-")));

                        myElement.find("select:first").append(getAddressesObject());

                        myElement.find("select").bind("change", function() {
                            // on changing the address, the coresponding datatype-field is
                            // automagically set
                            $dptField = $(this).closest(".edit").find(".add_transform:input");
                            var dpt = $(this).find("option:selected").attr("class").replace(/[^dpt_\d+\.\d+]*/, "").replace(/^dpt_/, "");
                            if ($dptField.is("input")) {
                                $dptField.val(dpt);
                            } else if ($dptField.is("select")) {
                                $dptField.find("option[value=" + dpt + "]").attr("selected", "selected");
                            }
                        });

                        if (typeof $e.text() != "undefined") {
                            myElement.find("option[value=" + $e.text() + "]").attr("selected", "selected");
                        }

                    }
                }
                if ($e.hasClass("transform")) {
                    element.find("label").html("transform");
                    if (typeof dptCache == undefined || dptCache == false) {
                        // appearantly we were unable to load the list of datatypes from the server
                        // we will provide an input-field instead
                        myElement.append($("<input class=\"add_transform\" />"));
                        if (typeof $e.val() != "undefined") {
                            // pre-set the value
                            myElement.find(":input").val($e.val());
                        }
                    } else {
                        myElement.append($("<select class=\"add_transform\" />")
                                        .append($("<option />").attr("value", "").html("-")));

                        myElement.find("select:first").append(getDPTObject());

                        if (typeof $e.text() != "undefined") {
                            myElement.find("option[value=" + $e.text() + "]").attr("selected", "selected");
                        }

                    }
                }
                if ($e.hasClass("readonly")) {
                    element.find("label").html("readonly");
                    myElement.append($("<input type=\"checkbox\" name=\"add_readonly\" class=\"add_readonly\" value=\"true\" />"));
                    if (typeof $e.text() != "undefined" && $e.text() != "") {
                        myElement.find("input").attr("checked", "checked");
                    }
                }

                if ($e.hasClass("addresstype")) {
                    element.find("label").html("addresstype");
                    myElement.append($("<input class=\"add_addresstype\" />"));
                    if (typeof $e.text() != "undefined") {
                        // pre-set the value
                        myElement.find(":input").val($e.text());
                    }

                }

                if (element.find("select")[0]) {
                    var select = element.find("select");
                    select.change(function() {
                        // update the input-field
                        jQuery(this).parent().find("input").val(jQuery(this).val());
                    })
                }

                element.find(":input")
                        .data("name", index)

                $edit.append(element);
                delete element;
           }
        });
        $edit.append(jQuery("<div class=\"clearfix\" />")
                    .append(jQuery("<button type=\"button\" class=\"save\">save</button>").click(function() {
                        // save sub-element
                        // todo: validate
                        $this = jQuery(this);
                        $e = $this.closest(".element");

                        var objData = {};
                        // don't try to hide it: this is hardcoded and works for addresses only
                        objData.type = "address";
                        objData.textContent = $e.find("input.add_address").val();
                        objData._attributes = {};
                        objData._attributes.transform = $e.find(".add_transform").val();
                        objData._attributes.type = $e.find(".add_addresstype").val();
                        objData._attributes.readonly = $e.find(".add_readonly:checked").val();

                        // remove this item and insert a new one instead
                        var elementDiv = createAddressEditorElement(objData);
                        $this.closest(".element").replaceWith(elementDiv);

                    }))
                    .append(jQuery("<button type=\"button\" class=\"cancel\">cancel</button>").click(function() {
                        // cancel edit of sub-element and return to previous values
                        $this = jQuery(this);
                        $this.closest(".element").removeClass("inedit").find(".editable").show();
                        $this.closest("div.edit").remove();
                    }))
                    .append(jQuery("<button type=\"button\" class=\"remove\">remove</button>").click(function() {
                        // remove this sub-element
                        $this = jQuery(this);
                        $this.closest(".element").remove();
                    }))
        );
    });
});


jQuery(function() {
    // dem addMaster Leben einhauchen
    jQuery("#addMaster")
        .bind("show", function() {
            if ($("#pages .inedit").is(".widget")) {
                $(this).find(".create").hide().end().find(".edit").show();
            } else {
                $(this).find(".create").show().end().find(".edit").hide();
            }

            // if we have widget-specific data, we must be in edit-mode
            var widgetdata = $(this).data("widgetdata");
            if (typeof widgetdata != "undefined") {
                $(this).find("#add_type").find("option[value=" + widgetdata._type + "]").attr("selected", "selected").trigger("change");
            }

            $(this).show()
                .find("#add_type").triggerHandler("change")
            jQuery(".page div").sortable("destroy");
            jQuery(".widget").unbind("mouseenter.edit").trigger("mouseleave.edit").unbind("mouseleave.edit");
        })
        .bind("hide", function() {
            $(this).hide();
            $("#pages").triggerHandler("done");
        })
        .bind("cleanup", function() {
            $(this).removeData("widgetdata");
            jQuery(this).find("input[type=text]").val("");
            $("#addMaster div.inputs").empty(); 
            $("#pages").find(".inedit").removeClass("inedit");
        })
        .find("#add_cancel").click(function() {
            jQuery("#addMaster").trigger("hide").trigger("cleanup")
        })
        .end()
        .find("#add_type").change(function() {
            // the type has been changed
            // we need to change the input-field accordingly to match
            // what attributes we need
            var val = jQuery(this).val();
            
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
                                objData._attributes.type = "";
                                objData._attributes.readonly = false;

                                var elementDiv = createAddressEditorElement(objData);
                                $input.find("div.multi_element").append(elementDiv);
                            });

                            if (typeof values._elements != "undefined"
                                && typeof values._elements[index] != "undefined") {
                                $.each(values._elements[index], function(i, e) {
                                    var elementDiv = createAddressEditorElement(e);
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

        })
        .end()
        /*******************
         * Speichervorgang *
         *******************/
        .find("#add_submit").click(function() {
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
                        if (false === isInputValid($(this).val(), $(this).data("type"))) {
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
                                .attr("addresstype", $(e).data("addresstype"))
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
                    if (false === isInputValid($(this).val(), $(this).data("type"))) {
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
        })
        .end();
        
});

/**
 * check whether a user-given value matches the type-criterias and thus is valid
 */
function isInputValid(val, type) {
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

function saveConfig() {
    var configData = createObjectFromPage("#0.page");
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

function getWidgetData(element) {
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
                        myElement._attributes.type  = jQuery(element).attr("type") || "";
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
            var subObject = createObjectFromPage(page);
            if (subObject._elements.length > 0) {
                myObj = subObject;
            }
        }
    }

    return myObj;
}

function getPageData(element) {

}

function createObjectFromPage(pageObject) {
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
            myObj = getWidgetData(element);
            if (typeof myObj != "undefined" && typeof myObj._type != "undefined") {
                elements.push(myObj);
            }
        }

    });

    obj._elements = elements;
    return obj;
}

/**
 * Rename a page
 * uses simple javascript-prompt to request a new name from the user
 */
function renamePage(widget) {
    var data = getWidgetData(widget, true);

    var newText = prompt(lingua("prompt_rename", data.name), data.name);
    if (!newText) {
        return;
    }

    var path = widget.data("path");

    widget.find("a").html(newText);
    widget.data("name", newText);
    $("#pages").find("#" + path + ".page").find("h1").html(newText);
}

var cachedAddressesObject;
function getAddressesObject() {

    if (typeof cachedAddressesObject == "object") {
        return cachedAddressesObject.clone();
    }

    element = $("<select />");

    $.each(addressesCache, function(hg, sub) {
        $.each(sub, function(mg, addresses) {
            element.append(
                $("<optgroup />").attr("label", hg + " - " + mg)
            );
            $.each(addresses, function (i, address) {
                element.find("optgroup:last")
                    .append($("<option />").attr("value", address.address)
                                .addClass("dpt_DPT:" + address.dpt)
                                .html(address.name)
                                )
            });
        });
    });

    cachedAddressesObject = element.children();

    return cachedAddressesObject;
}

var cachedDPTObject;
function getDPTObject() {

    if (typeof cachedDPTObject == "object") {
        return cachedDPTObject.clone();
    }

    var element = $("<select />");

    var lastMajor = "";

    $.each(dptCache, function(i, dptDefinition) {
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

    cachedDPTObject = element.children();

    return cachedDPTObject;
}

/**
 * Create a sub-element for the multi-editor to edit an address-entry.
 */
function createAddressEditorElement(element) {
    var elementDiv = jQuery("<div class=\"element clearfix\" />");
    elementDiv.append("<div class=\"title\" />")
        .append("<div class=\"value editable\" />")
        .append("<div class=\"transform editable\" />")
        .append("<div class=\"addresstype editable\" />")
        .append("<div class=\"readonly editable\" />");
    //myDiv.find(".title").append();
    var t = getAddressesObject();
    elementDiv.find(".title").append(t.find("option[value=" + element.textContent + "]").text());
    elementDiv.find(".value").append(element.textContent);
    elementDiv.find(".transform").append(element._attributes.transform);
    if (element._attributes.type != "undefined" && element._attributes.type != "") {
        elementDiv.find(".addresstype").append(element._attributes.type).show();
    } else {
        elementDiv.find(".addresstype").hide();
    }
    elementDiv.find(".readonly").append(element._attributes.readonly == "true" ? "readonly" : "")

    elementDiv.data("transform", element._attributes.transform)
        .data("addresstype", element._attributes.type)
        .data("readonly", element._attributes.readonly == "true" ? true : false)
        .data("address", element.textContent);

    return elementDiv;

}
