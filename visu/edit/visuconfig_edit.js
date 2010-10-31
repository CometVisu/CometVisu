var lingua = function(element, param) {
    var texts = {
        confirm_delete: "Delete '%s' from this page?",
        confirm_save:   "Save config?",
        prompt_rename:  "Rename page '%s' to ...",
        save_good:      "Config has been successfully saved.",
        save_bad:       "Config not saved. Error: '%s'"
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

jQuery(document).ready(function() {

    jQuery("div#addwidgetcontrol").bind("click", function() {
        jQuery("#addDummy").trigger("show").find("#add_type").triggerHandler("change");
    });

    $("#saveconfigcontrol").bind("click", function () {
       var b = confirm(lingua("confirm_save"));
       if (b) {
           saveConfig();
       }
    });

    jQuery("#pages").bind("done", function() {
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
    });

    jQuery(".removecontrol").live("click", function() {
        var widget = $(this).parents("div.widget");
        var data = getWidgetData(widget, true);

        var b = confirm(lingua("confirm_delete", data._text));
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

        jQuery.each(data, function(i, element) {
            // alle bekannten Einstellungen in die Maske einfügen
            $("#addDummy").find("#add_" + i).val(element);
        });

        if (typeof data._text != "undefined") {
            // text ist in einem Sonderfeld abgelegt
            $("#addDummy #add_text").val(data._text)
        }

        $("#addDummy #add_type").find("option[value=" + data._type + "]").attr("selected", "selected").trigger("change");

        $("#addDummy").triggerHandler("show");
    });

    jQuery("#pages").bind("done", function() {
        // die Selectlisten vorbelegen
        $("#addDummy #add_mapping, #addDummy #add_style").empty().append($("<option />").attr("value", "").html("-"));
        jQuery.each(mappings, function(i, element) {
            $("#addDummy #add_mapping").append($("<option />").attr("value", i).html(i));
        });
        jQuery.each(styles, function(i, element) {
            $("#addDummy #add_style").append($("<option />").attr("value", i).html(i));
        });
    });

});


jQuery(function() {
    // dem AddDummy Leben einhauchen
    jQuery("#addDummy")
        .bind("show", function() {
            if ($("#pages .inedit").is(".widget")) {
                $(this).find(".create").hide().end().find(".edit").show();
            } else {
                $(this).find(".create").show().end().find(".edit").hide();
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
            jQuery(this).find("input[type=text]").val("");
            $("#pages").find(".inedit").removeClass("inedit");
        })
        .find("#add_cancel").click(function() {
            jQuery("#addDummy").trigger("hide").trigger("cleanup")
        })
        .end()
        .find("#add_type").change(function() {
            var val = jQuery(this).val();
            var divSelector = "";
            switch (val) {
                case 'switch':
                case 'dim':
                    divSelector = ".add_text, .add_address, .add_datatype, .add_response_address, .add_response_datatype, .add_pre, .add_post, .add_mapping, .add_style";
                    break;
                case 'trigger':
                    divSelector = ".add_text, .add_address, .add_datatype, .add_pre, .add_post, .add_mapping, .add_style, .add_value";
                    break;
                case 'line':
                    divSelector = "";
                    break;
                case 'shade':
                    divSelector = "";
                    break;
                case 'info':
                    divSelector = ".add_text, .add_address, .add_datatype, .add_pre, .add_post, .add_mapping, .add_style";
                    break;
                case 'text':
                    divSelector = ".add_text";
                    break;
                case 'page':
                    divSelector = ".add_text";
                    break;
            }

            jQuery("#addDummy").find("div.add_inputs")
                .not(divSelector).hide()
                    .find("input[type=text]").val("")
                    .end()
                .end()
                .filter(divSelector).show();
        })
        .end()
        .find("#add_submit").click(function() {
            // Daten aus den Eingabefeldner übernehmen
            // einfach alle rein - das Design weiß schon welche Daten es benötigt
            var dataObject = {
                value: jQuery("#addDummy input#add_value").val(),
                address: jQuery("#addDummy input#add_address").val(),
                datatype: jQuery("#addDummy input#add_datatype").val(),
                response_address: jQuery("#addDummy input#add_response_address").val(),
                response_datatype: jQuery("#addDummy input#add_response_datatype").val(),
                pre: jQuery("#addDummy input#add_pre").val(),
                post: jQuery("#addDummy input#add_post").val(),
                mapping: jQuery("#addDummy select#add_mapping").val(),
                design: jQuery("#addDummy select#add_style").val(),
                textContent: jQuery("#addDummy input#add_text").val(),
                nodeName: jQuery("#addDummy #add_type").val(),
                name: jQuery("#addDummy input#add_text").val() // wird nur bei page benötigt
                };
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
            jQuery("#addDummy").trigger("hide").trigger("cleanup");
        })
        .end();

});

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

function getWidgetData(element, nodive) {
    var myObj = {};
    var e = $(element);
    var a = $(e).find(".actor");
    if (e.is("div.switch")) {
        // switch oder trigger
        if (a.data("type") == "trigger") {
            // trigger
            myObj = {
                    address: a.data("GA"),
                    datatype: a.data("datatype"),
                    value: a.data("sendValue"),
                    pre: e.data("pre"),
                    post: e.data("post"),
                    mapping: a.data("mapping"),
                    style: a.data("style"),
                    _text: e.find("div.label").text(),
                    _type: "trigger"
            };
        } else {
            // switch
            myObj = {
                    address: a.data("GA"),
                    datatype: a.data("datatype"),
                    pre: e.data("pre"),
                    post: e.data("post"),
                    mapping: a.data("mapping"),
                    style: a.data("style"),
                    response_address: e.data("response_address"),
                    response_datatype: e.data("response_datatype"),
                    _text: e.find("div.label").text(),
                    _type: "switch"
            };
        }
    } else if (e.is("div.text")) {
        // text
        myObj = {
                _text: e.find("div.label").text(),
                _type: "text"
        };
    } else if (e.is("div.dim")) {
        // slider
        myObj = {
                address: a.data("GA"),
                datatype: a.data("datatype"),
                mapping: a.data("mapping"),
                style: a.data("style"),
                response_address: e.data("response_address"),
                response_datatype: e.data("response_datatype"),
                _text: e.find("div.label").text(),
                _type: "dim"
        };
    } else if (e.is("div.info")) {
        // Info-Feld
        myObj = {
                address: a.data("GA"),
                datatype: a.data("datatype"),
                pre: e.data("pre"),
                post: e.data("post"),
                mapping: a.data("mapping"),
                style: a.data("style"),
                _text: e.find("div.label").text(),
                _type: "info"
        };
    } else if (e.is("div.line")) {
        // Trennlinie
        myObj = {
            _type: "line",
            _text: "line"
        }
    } else if (e.is(".pagelink")) {
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
        } else if (nodive) {
            // wir sollen nicht rekursiv arbeiten,
            // aber dieses eine Objekt liefern wir zurück
            myObj = {
              _type: "page",
              _text: s.text(), // für edit-modus benötigt
              name: s.text()
            };
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

    var newText = prompt(lingua("prompt_rename", data._text), data._text);
    if (!newText) {
        return;
    }

    var path = widget.data("path");

    widget.find("a").html(newText);
    $("#pages").find("#" + path + ".page").find("h1").html(newText);
}