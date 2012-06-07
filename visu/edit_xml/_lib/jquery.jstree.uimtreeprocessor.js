/*
 * UIMTreeProcessor Class
 * version: 1.0 (11-16-2010)
 * 
 * Copyright (c) 2010 Vlad Shamgin (uimonster.com)
 * 
 * @requires jQuery v1.3.2 or later
 * @requires jsTree 1.0-rc1 or later
 *
 * Examples and documentation at: http://uimonster.com
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Changed for CV mm at elabnet.de
 */
 
function UIMTreeProcessor(data, treeEl) {
    this.data = data;
    this.treeEl = treeEl;
}
 
UIMTreeProcessor.prototype.initTree = function(data){
    this.treeEl.jstree({
        "json_data" : {
            "data":data
            /* ,"progressive_render":"true" */
        },
        "plugins" : [ "themes", "ui", "json_data", "dnd", "hotkeys", "crrm", "keys", "types", "contextmenu", "cookies" ],
        "core":{
            "animation":0, 
            "initially_open" : [ "page" ]        
        },

        /* FIXME: This should really come from the .xsd (convert?) and not be hardcoded */
        "types" : {
            // I set both options to -2, as I do not need depth and children count checking
            // Those two checks may slow jstree a lot, so use only when needed
            "max_depth" : -2,
            "max_children" : -2,
            // only want `pages` to be root nodes 
            // This will prevent moving or creating any other type as a root node
            "valid_children" : [ "pages" ],
            "types" : {
                "meta" : {
                    // can have mappings, stylings etc but not pages
                    "valid_children" : [ "mappings", "stylings", "statusbar" ],
                    "icon" : {
                        "image" : "./meta.png"
                    }
                },
                "page" : {
                    // can have all widgets, pages inside
                    "valid_children" : [ "page", "MANYMORE" ],
                    "icon" : {
                        "image" : "./page.png"
                    },
                    // those prevent the functions with the same name to be used on page nodes
                    // internally the `before` event is used
                    "start_drag" : false,
                    "move_node" : false,
                    "delete_node" : false,
                    "remove" : false
                }
            }
        }
    });
}
 
UIMTreeProcessor.prototype.doProcess = function(){
    //Find root:
    var _root = $(this.data).children(':first-child');
    var _a_feed = new Array();
 
    this.vsTraverse($(_root), _a_feed);
 
    var _treedata = [{"data":_root[0].nodeName,"children":_a_feed, "state":"closed"}];
    this.initTree(_treedata);
}
 
UIMTreeProcessor.prototype.vsTraverse = function(node, arr){
    var _ch = $(node).children();
 
    for(var i=0; i<_ch.length; i++){
        var _vsArr = new Array();
        this.vsTraverse(_ch[i], _vsArr);
        var _a_att = this.vsTraverseAtt(_ch[i]);
        if(null!=_a_att){
            _vsArr.push([{"data":"Attributes "+"["+_ch[i].nodeName+"]","children":_a_att, attr : { "class" : "uim_attr"}}]);
        }
        if(null!=_ch[i].firstChild && 3==_ch[i].firstChild.nodeType){
            arr.push([{"data":_ch[i].nodeName + ": " + _ch[i].firstChild.textContent,"children":_vsArr, "state":"open"}]);
        }else{
            arr.push([{"data":_ch[i].nodeName,"children":_vsArr, "state":"open"}]);
        }
 
    }
}
 
UIMTreeProcessor.prototype.vsTraverseAtt = function(node){
    var _a_atts = null;
    if(null!=node.attributes && node.attributes.length > 0){
        _a_atts = new Array();
        for(var i=0; i<node.attributes.length; i++){
            _a_atts.push(node.attributes[i].nodeName + ":" + node.attributes[i].nodeValue);
        }
    }
    return _a_atts;
}
