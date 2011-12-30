var lingua = function(element, param) {
    var texts = {
        confirm_delete:     "Delete '%s' from this page?",
        confirm_save:       "Save config?",
        prompt_rename:      "Rename page '%s' to ...",
        save_good:          "Config has been successfully saved.",
        save_bad:           "Config not saved. Error: '%s'",
        value_required:     "Field '%s' is required but empty. Please correct your input.",
        value_invalid:      "The value for field '%s' is invalid. Please correct your input.",
        regexp_invalid:     "There's something wrong with the cable.",
        bad_get_addresses:  "Failed to get address-config. Error: '%s'.",
        bad_get_dpts:       "Failed to get DPT-config. Error: '%s'.",
        bad_get_rrds:       "Failed to get available RRDs. Error: '%s'."
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

/**
 * Rename a page
 * uses simple javascript-prompt to request a new name from the user
 */
function renamePage(widget) {
    var data = Editor.getWidgetData(widget, true);

    var newText = prompt(lingua("prompt_rename", data._attributes.name), data._attributes.name);
    if (!newText) {
        return;
    }

    var path = widget.data("path");

    widget.find("a").html(newText);
    widget.data("name", newText);
    $("#pages").find("#" + path + ".page").find("h1").html(newText);
    // update configData or next "edit" will show old name
    widget.data("configData").attributes.name = newText;
}


var Editor = new CometEditor();
var HTMLLayer = new CometEditorHTMLLayer();

jQuery(document).ready(function() {
    $('#StatusBar').jnotifyInizialize({oneAtTime: false})

    // get all rrds from the server
    Editor.cacheServerData("edit/get_widget_diagram.php", "rrdCache");
    // get all GAs from the server
    Editor.cacheServerData("edit/get_addresses.php", "addresses");
    // get all known dpt from the server
    Editor.cacheServerData("edit/dpt_list.json", "dpts");

    jQuery("div#addwidgetcontrol").bind("click", function() {
        $("#addMaster").triggerHandler("cleanup");
        jQuery("#addMaster").trigger("show").find("#add_type").triggerHandler("change");
    });

    $("#saveconfigcontrol").bind("click", function () {
       Editor.saveConfig();
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
            
            if (design.creators[index].maturity > use_maturity) {
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
        var data = Editor.getWidgetData(widget, true);

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

        var data = Editor.getWidgetData(widget, true);

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

                    if (typeof Editor.cache.addresses != undefined && Editor.cache.addresses != false) {
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

                        myElement.find("select:first").append(Editor.getAddressesObject());

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
                    if (typeof Editor.cache.dpts == undefined || Editor.cache.dpts == false) {
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

                        myElement.find("select:first").append(Editor.getDPTObject());

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

                if ($e.hasClass("variant")) {
                    element.find("label").html("variant");
                    myElement.append($("<input class=\"add_variant\" />"));
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
                        objData._attributes.variant = $e.find(".add_variant").val();
                        objData._attributes.readonly = $e.find(".add_readonly:checked").val();

                        // remove this item and insert a new one instead
                        var elementDiv = HTMLLayer.createAddressEditorElement(objData);
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
            Editor.refreshEditor(jQuery(this).val());
        })
        .end()
        /*******************
         * Speichervorgang *
         *******************/
        .find("#add_submit").click(function() {
            Editor.saveElement();
        })
        .end();
        
});
