var lingua = function(element, param) {
    var texts = {
        confirm_delete: "Delete '%s' from this page?",
        confirm_save:   "Save config?",
        prompt_rename:  "Rename page '%s' to ...",
        save_good:      "Config has been successfully saved.",
        save_bad:       "Config not saved. Error: '%s'",
        value_required: "Field '%s' is required but empty. Please correct your input.",
        value_invalid:  "The value for field '%s' is invalid. Please correct your input.",
        regexp_invalid: "There something wrong with the cable."
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

jQuery(document).ready(function() {

    jQuery("div#addwidgetcontrol").bind("click", function() {
        jQuery("#addMaster").trigger("show").find("#add_type").triggerHandler("change");
    });

    $("#saveconfigcontrol").bind("click", function () {
       var b = confirm(lingua("confirm_save"));
       if (b) {
           saveConfig();
       }
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
            var creator = design.getCreator(val);
            var attributes = creator.attributes;
            if (typeof attributes == "undefined") {
                alert("there's something wrong with the cable");
                return;
            }

            var container = $("#addMaster div.inputs");
            var values = $.extend({}, $("#addMaster").data("widgetdata"));

            if (!$("#pages .inedit").is(".widget")) {
                // alte Werte zwischenspeichern
                container.find(":input").each(function() {
                    if ($(this).val() != "") {
                        var name = $(this).data("name");
                        values[name] = $(this).val();
                    }
                })
            }
            container.empty();

            if (typeof creator.content.type != "undefined" && creator.content.type == "string") {

                var element = $("<div />").addClass("add_input").addClass("content")
                            .append($("<label />").attr("for", "add_textContent").html("text-content"))
                            .append($("<input type=\"text\" id=\"add_textContent\"/>"));
                if (typeof values["textContent"] != "undefined") {
                    element.find("input").val(values["textContent"]);
                }

                element.find(":input").data("required", creator.content.required);

                container.append(element);
                delete element;
            }

            $.each(attributes, function (index, e) {
                var element = $("<div />").addClass("add_input").addClass("attribute")
                                    .append($("<label />").attr("for", "add_" + index).html(index));

                switch (e.type) {
                    case "address":
                        if (typeof addressesCache == undefined || addressesCache == false) {
                            // appearantly we were unable to load the list of addresses from the server
                            // we will provide an input-field instead
                            element.append($("<input id=\"add_" + index + "\" />"));
                            if (typeof values[index] != "undefined") {
                                // pre-set the value
                                element.find(":input").val(values[index]);
                            }
                        } else {
                            element.append($("<select id=\"add_" + index + "\" />")
                                            .append($("<option />").attr("value", "").html("-")));

                            element.find("select:first").append(getAddressesObject());

                            element.find("select").bind("change", function() {
                                // on changing the address, the coresponding datatype-field is
                                // automagically set
                                var name = $(this).attr("id");
                                var dptFieldName = name.replace(/_?address$/i, "_datatype");
                                var dpt = $(this).find("option:selected").attr("class").replace(/[^dpt_\d+\.\d+]*/, "").replace(/^dpt_/, "");
                                if ($("#addMaster #" + dptFieldName).is("input")) {
                                    $("#addMaster div.inputs #" + dptFieldName).val(dpt);
                                } else if ($("#addMaster #" + dptFieldName).is("select")) {
                                    $("#addMaster #" + dptFieldName).find("option[value=" + dpt + "]").attr("selected", "selected");
                                }
                            });

                            if (typeof values[index] != "undefined") {
                                element.find("option[value=" + values[index] + "]").attr("selected", "selected");
                            }

                        }
                        break;
                    case "datatype":
                        if (typeof dptCache == undefined || dptCache == false) {
                            // appearantly we were unable to load the list of datatypes from the server
                            // we will provide an input-field instead
                            element.append($("<input id=\"add_" + index + "\" />"));
                            if (typeof values[index] != "undefined") {
                                // pre-set the value
                                element.find(":input").val(values[index]);
                            }
                        } else {
                            element.append($("<select id=\"add_" + index + "\" />")
                                            .append($("<option />").attr("value", "").html("-")));

                            element.find("select:first").append(getDPTObject());

                            if (typeof values[index] != "undefined") {
                                element.find("option[value=" + values[index] + "]").attr("selected", "selected");
                            }

                        }
                        break;

                    case "mapping":
                        element.append($("<select id=\"add_mapping\" />")
                                        .append($("<option />").attr("value", "").html("-")));
                        jQuery.each(mappings, function(i, tmp) {
                            element.find("select#add_mapping").append($("<option />").attr("value", i).html(i));
                        });

                        if (typeof values[index] != "undefined") {
                            element.find("option[value=" + values[index] + "]").attr("selected", "selected");
                        }

                        break;
                        
                    case "styling":
                        element.append($("<select id=\"add_styling\" />")
                                        .append($("<option />").attr("value", "").html("-")));
                        jQuery.each(stylings, function(i, tmp) {
                            element.find("select#add_styling").append($("<option />").attr("value", i).html(i));
                        });

                        if (typeof values[index] != "undefined") {
                            element.find("option[value=" + values[index] + "]").attr("selected", "selected");
                        }

                        break;
                    case "datatype":
                        break;
                    default:
                        element.append($("<input type=\"text\" id=\"add_" +  index + "\" />"));

                        if (typeof values[index] != "undefined") {
                            element.find("input").val(values[index]);
                        }

                        break;
                }

                element.find(":input")
                        .data("name", index)
                        .data("required", e.required)
                        .data("type", e.type);

                container.append(element);
                delete element;
            });
        })
        .end()
        .find("#add_submit").click(function() {
            // Daten aus den Eingabefeldner übernehmen
            // einfach alle rein - wir haben ja nur die passenden Felder

            var container = $("#addMaster div.inputs");

            var dataObject = {
                nodeName: jQuery("#addMaster #add_type").val()
            };

            var error = false;

            // alte Werte zwischenspeichern
            container.find(":input").each(function() {
                var name;
                if ($(this).closest("div.add_input").hasClass("attribute")) {
                    name = $(this).data("name");
                } else if ($(this).closest("div.add_input").hasClass("content")) {
                    name = "textContent";
                    // preset text-content to be empty
                    dataObject[name] = "";
                }

                if ($(this).val() != "") {
                    // validating
                    if (false === isInputValid($(this).val(), $(this).data("type"))) {
                        alert(lingua("value_invalid", name));
                        // do not save
                        error = true;
                    }
                    dataObject[name] = $(this).val();
                } else if ($(this).data("required") === true) {
                    // do not save
                    alert(lingua("value_required", name));
                    error = true;
                }
            })

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
            alert(lingua("regexp_invalid"));
            return false;
        }
    }

    switch (type) {
        case "address":
            return Boolean(val.match(/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{1,3}$/) != null);
            break;
        case "datatype":
        case "numeric":
            return Boolean(val.match(/^\d+([\.,]\d+)?$/g));
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
            alert(lingua("save_bad", errorThrown));
        },
        success: function(data, textStatus, XMLHttpRequest) {
            if (data != 1) {
                alert(lingua("save_bad", data));
                return;
            }
            alert(lingua("save_good"));
        }
    });
}

function getWidgetData(element) {
    var myObj = {};

    var e = $(element);

    myObj._type = e.data("nodeName");
    myObj.textContent = e.data("textContent");
    $.extend(myObj, e.data("attributes"));

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

function createObjectFromPage(pageObject) {
    var obj = {};
    var elements = new Array();
    $(pageObject).find("h1, .widget").each(function(index, element) {
        if ($(element).is("h1")) {
            // Seitenname
            obj.name = $(element).text();
            obj._type = "page";
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
                                .addClass("dpt_" + address.dpt)
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

    element = $("<select />");

    $.each(dptCache, function(i, dptDefinition) {
        element.append($("<option />").attr("value", dptDefinition.dpt)
                .html("" + dptDefinition.dpt + ": " + dptDefinition.name)
                );
    });

    cachedDPTObject = element.children();

    return cachedDPTObject;
}