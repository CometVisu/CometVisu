/* visudesign_custom.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
*/

/**
 * This class re-defines all methods so all elements behave like the
 * original from _pure, but have additional data so the editor can
 * work with.
 * 
 */
function VisuDesign_Custom() {};                // do NOT change here
VisuDesign_Custom.prototype = new VisuDesign(); // do NOT chagen here


VisuDesign_Custom.prototype.createPage = function(page, path)
  {
    var ret_val = new VisuDesign().createPage(page, path);
    ret_val.data({path: path});
    ret_val.addClass("pagelink");
    return ret_val;
  }

VisuDesign_Custom.prototype.createLine = function()
  {
    var ret_val = new VisuDesign().createLine();
    return $("<div />").attr("class", "widget line").append(ret_val);
  }

VisuDesign_Custom.prototype.createText = function(page)
  {
    var ret_val = new VisuDesign().createText(page);
    return ret_val;
  }

VisuDesign_Custom.prototype.createInfo =
VisuDesign_Custom.prototype.createShade = function( page )
  {
    var ret_val = new VisuDesign().createInfo(page);
    ret_val.data({
        pre: $(page).attr('pre'),
        post: $(page).attr('post')
    });
    ret_val.find(".actor").data("style", $(page).attr("design"));
    return ret_val;
  }

VisuDesign_Custom.prototype.createDim = function( page )
  {
    var ret_val = new VisuDesign().createDim(page);
    ret_val.data({
        response_address: $(page).attr('response_address'),
        response_datatype: $(page).attr('response_datatype')
    });
    return ret_val;
  }

VisuDesign_Custom.prototype.createSwitch =
VisuDesign_Custom.prototype.createToggle = function( page )
  {
    var ret_val = new VisuDesign().createSwitch(page);
    ret_val.data({
        pre: $(page).attr('pre'),
        post: $(page).attr('post'),
        response_address: $(page).attr('response_address'),
        response_datatype: $(page).attr('response_datatype')
    });
    ret_val.find(".actor").data("style", $(page).attr("design"));
    return ret_val;
  }

VisuDesign_Custom.prototype.createTrigger = function( page )
  {
    var ret_val = new VisuDesign().createTrigger(page);
    ret_val.data({
        pre: $(page).attr('pre'),
        post: $(page).attr('post')
    });
    ret_val.find(".actor").data("style", $(page).attr("design"));
    return ret_val;
  }

VisuDesign_Custom.prototype.createUnknown = function( page )
  {
    var ret_val = new VisuDesign().createUnknown(page);
    return ret_val;
  }