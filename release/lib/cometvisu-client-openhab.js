/* cometvisu-client-openhab.js (c) 2015 by Tobias Bräutigam [tbraeutigam at gmail dot com]
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

define(["cometvisu-client"],function(e){function t(e){var t=this;this.urlPrefix="/rest/cv/",this.eventSource=null,this.handleSession=function(e){this.session=e.s,this.version=e.v.split(".",3),(0<parseInt(this.version[0])||1<parseInt(this.version[1]))&&alert("ERROR CometVisu Client: too new protocol version ("+e.v+") used!"),this.running=!0,this.eventSource=new EventSource(this.urlPrefix+"r?"+this.buildRequest()),this.eventSource.addEventListener("message",this.handleMessage,!1),this.eventSource.addEventListener("error",this.handleError,!1)},this.handleMessage=function(e){var n=JSON.parse(e.data),r=n.d;t.lastIndex=e.lastEventId,t.update(r)},this.handleError=function(e){e.readyState==EventSource.CLOSED&&(t.running=!1)},this.abort=function(){t.eventSource&&t.eventSource.close()},this.stop=function(){this.running=!1,this.abort()},this.restart=function(){}}return t.prototype=new e("/rest/cv/"),t.prototype.constructor=t,t.prototype.update=function(e){},t});