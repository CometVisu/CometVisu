var _url = "../visu_config_demo.xml";
var _uimTree = null;

getXMLtree = function(){
    $.ajax({
        type: "GET",
        url: _url,
        dataType:"xml",
        cache: false,
        beforeSend:function(){
            //do something before send
        },
        success: function(data){
            processXML(data);
        },
        error:function(obj, textStatus, errorThrown){
            console.error(textStatus + ": " + errorThrown + " URL: " + _url);
        }
    });
}

processXML = function(root){
	_uimTree = new UIMTreeProcessor(root, $("#jstree"));
	_uimTree.doProcess();
}
//console.log ("hallo welt");

