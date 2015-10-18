/*
 strftime for Javascript
 Copyright (c) 2008, Philip S Tellis <philip@bluesmoon.info>
 All rights reserved.
 
 This code is distributed under the terms of the BSD licence
 
 Redistribution and use of this software in source and binary forms, with or without modification,
 are permitted provided that the following conditions are met:

   * Redistributions of source code must retain the above copyright notice, this list of conditions
     and the following disclaimer.
   * Redistributions in binary form must reproduce the above copyright notice, this list of
     conditions and the following disclaimer in the documentation and/or other materials provided
     with the distribution.
   * The names of the contributors to this file may not be used to endorse or promote products
     derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * \mainpage strftime for Javascript
 *
 * \section toc Table of Contents
 * - \ref intro_sec
 * - <a class="el" href="strftime.js">Download full source</a> / <a class="el" href="strftime-min.js">minified</a>
 * - \subpage usage
 * - \subpage format_specifiers
 * - \subpage localisation
 * - \link strftime.js API Documentation \endlink
 * - \subpage demo
 * - \subpage changelog
 * - \subpage faq
 * - <a class="el" href="http://tech.bluesmoon.info/2008/04/strftime-in-javascript.html">Feedback</a>
 * - \subpage copyright_licence
 *
 * \section intro_sec Introduction
 *
 * C and PHP developers have had access to a built in strftime function for a long time.
 * This function is an easy way to format dates and times for various display needs.
 *
 * This library brings the flexibility of strftime to the javascript Date object
 *
 * Use this library if you frequently need to format dates in javascript in a variety of ways.  For example,
 * if you have PHP code that writes out formatted dates, and want to mimic the functionality using
 * progressively enhanced javascript, then this library can do exactly what you want.
 *
 *
 *
 *
 * \page usage Example usage
 *
 * \section usage_sec Usage
 * This library may be used as follows:
 * \code
 *     var d = new Date();
 *
 *     var ymd = d.strftime('%Y/%m/%d');
 *     var iso = d.strftime('%Y-%m-%dT%H:%M:%S%z');
 *
 * \endcode
 *
 * \subsection examples Examples
 * 
 * To get the current time in hours and minutes:
 * \code
 * 	var d = new Date();
 * 	d.strftime("%H:%M");
 * \endcode
 *
 * To get the current time with seconds in AM/PM notation:
 * \code
 * 	var d = new Date();
 * 	d.strftime("%r");
 * \endcode
 *
 * To get the year and day of the year for August 23, 2009:
 * \code
 * 	var d = new Date('2009/8/23');
 * 	d.strftime("%Y-%j");
 * \endcode
 *
 * \section demo_sec Demo
 *
 * Try your own examples on the \subpage demo page.  You can use any of the supported
 * \subpage format_specifiers.
 *
 *
 *
 *
 * \page localisation Localisation
 * You can localise strftime by implementing the short and long forms for days of the
 * week and months of the year, and the localised aggregates for the preferred date
 * and time representation for your locale.  You need to add your locale to the
 * Date.ext.locales object.
 *
 * \section localising_fr Localising for french
 *
 * For example, this is how we'd add French language strings to the locales object:
 * \dontinclude index.html
 * \skip Generic french
 * \until };
 * The % format specifiers are all defined in \ref formats.  You can use any of those.
 *
 * This locale definition may be included in your own source file, or in the HTML file
 * including \c strftime.js, however it must be defined \em after including \c strftime.js
 *
 * The above definition includes generic french strings and formats that are used in France.
 * Other french speaking countries may have other representations for dates and times, so we
 * need to override this for them.  For example, Canadian french uses a Y-m-d date format,
 * while French french uses d.m.Y.  We fix this by defining Canadian french to be the same
 * as generic french, and then override the format specifiers for \c x for the \c fr-CA locale:
 * \until End french
 *
 * You can now use any of the French locales at any time by setting \link Date.prototype.locale Date.locale \endlink
 * to \c "fr", \c "fr-FR", \c "fr-CA", or any other french dialect:
 * \code
 *     var d = new Date("2008/04/22");
 *     d.locale = "fr";
 *
 *     d.strftime("%A, %d %B == %x");
 * \endcode
 * will return:
 * \code
 *     mardi, 22 avril == 22.04.2008
 * \endcode
 * While changing the locale to "fr-CA":
 * \code
 *     d.locale = "fr-CA";
 *
 *     d.strftime("%A, %d %B == %x");
 * \endcode
 * will return:
 * \code
 *     mardi, 22 avril == 2008-04-22
 * \endcode
 *
 * You can use any of the format specifiers defined at \ref formats
 *
 * The locale for all dates defaults to the value of the \c lang attribute of your HTML document if
 * it is set, or to \c "en" otherwise.
 * \note
 * Your locale definitions \b MUST be added to the locale object before calling
 * \link Date.prototype.strftime Date.strftime \endlink.
 *
 * \sa \ref formats for a list of format specifiers that can be used in your definitions
 * for c, x and X.
 *
 * \section locale_names Locale names
 *
 * Locale names are defined in RFC 1766. Typically, a locale would be a two letter ISO639
 * defined language code and an optional ISO3166 defined country code separated by a -
 * 
 * eg: fr-FR, de-DE, hi-IN
 *
 * \sa http://www.ietf.org/rfc/rfc1766.txt
 * \sa http://www.loc.gov/standards/iso639-2/php/code_list.php
 * \sa http://www.iso.org/iso/country_codes/iso_3166_code_lists/english_country_names_and_code_elements.htm
 * 
 * \section locale_fallback Locale fallbacks
 *
 * If a locale object corresponding to the fully specified locale isn't found, an attempt will be made
 * to fall back to the two letter language code.  If a locale object corresponding to that isn't found
 * either, then the locale will fall back to \c "en".  No warning will be issued.
 *
 * For example, if we define a locale for de:
 * \until };
 * Then set the locale to \c "de-DE":
 * \code
 *     d.locale = "de-DE";
 *
 *     d.strftime("%a, %d %b");
 * \endcode
 * In this case, the \c "de" locale will be used since \c "de-DE" has not been defined:
 * \code
 *     Di, 22 Apr
 * \endcode
 *
 * Swiss german will return the same since it will also fall back to \c "de":
 * \code
 *     d.locale = "de-CH";
 *
 *     d.strftime("%a, %d %b");
 * \endcode
 * \code
 *     Di, 22 Apr
 * \endcode
 *
 * We need to override the \c a specifier for Swiss german, since it's different from German german:
 * \until End german
 * We now get the correct results:
 * \code
 *     d.locale = "de-CH";
 *
 *     d.strftime("%a, %d %b");
 * \endcode
 * \code
 *     Die, 22 Apr
 * \endcode
 *
 * \section builtin_locales Built in locales
 *
 * This library comes with pre-defined locales for en, en-GB, en-US and en-AU.
 *
 * 
 *
 *
 * \page format_specifiers Format specifiers
 * 
 * \section specifiers Format specifiers
 * strftime has several format specifiers defined by the Open group at 
 * http://www.opengroup.org/onlinepubs/007908799/xsh/strftime.html
 *
 * PHP added a few of its own, defined at http://www.php.net/strftime
 *
 * This javascript implementation supports all the PHP specifiers
 *
 * \subsection supp Supported format specifiers:
 * \copydoc formats
 * 
 * \subsection unsupportedformats Unsupported format specifiers:
 * \copydoc unsupported
 *
 *
 *
 *
 * \page demo strftime demo
 * <div style="float:right;width:45%;">
 * \copydoc formats
 * </div>
 * \htmlinclude index.html
 *
 *
 *
 *
 * \page faq FAQ
 * 
 * \section how_tos Usage
 *
 * \subsection howtouse Is there a manual on how to use this library?
 *
 * Yes, see \ref usage
 *
 * \subsection wheretoget Where can I get a minified version of this library?
 *
 * The minified version is available <a href="strftime-min.js" title="Minified strftime.js">here</a>.
 *
 * \subsection which_specifiers Which format specifiers are supported?
 *
 * See \ref format_specifiers
 *
 * \section whys Why?
 *
 * \subsection why_lib Why this library?
 *
 * I've used the strftime function in C, PHP and the Unix shell, and found it very useful
 * to do date formatting.  When I needed to do date formatting in javascript, I decided
 * that it made the most sense to just reuse what I'm already familiar with.
 *
 * \subsection why_another Why another strftime implementation for Javascript?
 *
 * Yes, there are other strftime implementations for Javascript, but I saw problems with
 * all of them that meant I couldn't use them directly.  Some implementations had bad
 * designs.  For example, iterating through all possible specifiers and scanning the string
 * for them.  Others were tied to specific libraries like prototype.
 *
 * Trying to extend any of the existing implementations would have required only slightly
 * less effort than writing this from scratch.  In the end it took me just about 3 hours
 * to write the code and about 6 hours battling with doxygen to write these docs.
 *
 * I also had an idea of how I wanted to implement this, so decided to try it.
 *
 * \subsection why_extend_date Why extend the Date class rather than subclass it?
 *
 * I tried subclassing Date and failed.  I didn't want to waste time on figuring
 * out if there was a problem in my code or if it just wasn't possible.  Adding to the
 * Date.prototype worked well, so I stuck with it.
 *
 * I did have some worries because of the way for..in loops got messed up after json.js added
 * to the Object.prototype, but that isn't an issue here since {} is not a subclass of Date.
 *
 * My last doubt was about the Date.ext namespace that I created.  I still don't like this,
 * but I felt that \c ext at least makes clear that this is external or an extension.
 *
 * It's quite possible that some future version of javascript will add an \c ext or a \c locale
 * or a \c strftime property/method to the Date class, but this library should probably
 * check for capabilities before doing what it does.
 *
 * \section curiosity Curiosity
 *
 * \subsection how_big How big is the code?
 *
 * \arg 26K bytes with documentation
 * \arg 4242 bytes minified using <a href="http://developer.yahoo.com/yui/compressor/">YUI Compressor</a>
 * \arg 1477 bytes minified and gzipped
 *
 * \subsection how_long How long did it take to write this?
 *
 * 15 minutes for the idea while I was composing this blog post:
 * http://tech.bluesmoon.info/2008/04/javascript-date-functions.html
 *
 * 3 hours in one evening to write v1.0 of the code and 6 hours the same
 * night to write the docs and this manual.  As you can tell, I'm fairly
 * sleepy.
 *
 * Versions 1.1 and 1.2 were done in a couple of hours each, and version 1.3
 * in under one hour.
 *
 * \section contributing Contributing
 *
 * \subsection how_to_rfe How can I request features or make suggestions?
 *
 * You can leave a comment on my blog post about this library here:
 * http://tech.bluesmoon.info/2008/04/strftime-in-javascript.html
 *
 * \subsection how_to_contribute Can I/How can I contribute code to this library?
 *
 * Yes, that would be very nice, thank you.  You can do various things.  You can make changes
 * to the library, and make a diff against the current file and mail me that diff at
 * philip@bluesmoon.info, or you could just host the new file on your own servers and add
 * your name to the copyright list at the top stating which parts you've added.
 *
 * If you do mail me a diff, let me know how you'd like to be listed in the copyright section.
 *
 * \subsection copyright_signover Who owns the copyright on contributed code?
 *
 * The contributor retains copyright on contributed code.
 *
 * In some cases I may use contributed code as a template and write the code myself.  In this
 * case I'll give the contributor credit for the idea, but will not add their name to the
 * copyright holders list.
 *
 *
 *
 *
 * \page copyright_licence Copyright & Licence
 *
 * \section copyright Copyright
 * \dontinclude strftime.js
 * \skip Copyright
 * \until rights
 *
 * \section licence Licence
 * \skip This code
 * \until SUCH DAMAGE.
 *
 *
 *
 * \page changelog ChangeLog
 *
 * \par 1.3 - 2008/06/17:
 * - Fixed padding issue with negative timezone offsets in %r
 *   reported and fixed by Mikko:
 *   http://tech.bluesmoon.info/2008/04/strftime-in-javascript.html
 * - Added support for %P
 * - Internationalised %r, %p and %P
 *
 * \par 1.2 - 2008/04/27:
 * - Fixed support for c (previously it just returned toLocaleString())
 * - Add support for c, x and X
 * - Add locales for en-GB, en-US and en-AU
 * - Make en-GB the default locale (previous was en)
 * - Added more localisation docs
 *
 * \par 1.1 - 2008/04/27:
 * - Fix bug in xPad which wasn't padding more than a single digit
 * - Fix bug in j which had an off by one error for days after March 10th because of daylight savings
 * - Add support for g, G, U, V and W
 *
 * \par 1.0 - 2008/04/22:
 * - Initial release with support for a, A, b, B, c, C, d, D, e, H, I, j, m, M, p, r, R, S, t, T, u, w, y, Y, z, Z, and %
 */

Date.ext={},Date.ext.util={},Date.ext.util.xPad=function(e,t,n){typeof n=="undefined"&&(n=10);for(;parseInt(e,10)<n&&n>1;n/=10)e=t.toString()+e;return e.toString()},Date.prototype.locale="en-GB",document.getElementsByTagName("html")&&document.getElementsByTagName("html")[0].lang&&(Date.prototype.locale=document.getElementsByTagName("html")[0].lang),Date.ext.locales={},Date.ext.locales.en={a:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],A:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],b:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],B:["January","February","March","April","May","June","July","August","September","October","November","December"],c:"%a %d %b %Y %T %Z",p:["AM","PM"],P:["am","pm"],x:"%d/%m/%y",X:"%T"},Date.ext.locales["en-US"]=Date.ext.locales.en,Date.ext.locales["en-US"].c="%a %d %b %Y %r %Z",Date.ext.locales["en-US"].x="%D",Date.ext.locales["en-US"].X="%r",Date.ext.locales["en-GB"]=Date.ext.locales.en,Date.ext.locales["en-AU"]=Date.ext.locales["en-GB"],Date.ext.formats={a:function(e){return Date.ext.locales[e.locale].a[e.getDay()]},A:function(e){return Date.ext.locales[e.locale].A[e.getDay()]},b:function(e){return Date.ext.locales[e.locale].b[e.getMonth()]},B:function(e){return Date.ext.locales[e.locale].B[e.getMonth()]},c:"toLocaleString",C:function(e){return Date.ext.util.xPad(parseInt(e.getFullYear()/100,10),0)},d:["getDate","0"],e:["getDate"," "],g:function(e){return Date.ext.util.xPad(parseInt(Date.ext.util.G(e)/100,10),0)},G:function(e){var t=e.getFullYear(),n=parseInt(Date.ext.formats.V(e),10),r=parseInt(Date.ext.formats.W(e),10);return r>n?t++:r===0&&n>=52&&t--,t},H:["getHours","0"],I:function(e){var t=e.getHours()%12;return Date.ext.util.xPad(t===0?12:t,0)},j:function(e){var t=e-new Date(""+e.getFullYear()+"/1/1 GMT");t+=e.getTimezoneOffset()*6e4;var n=parseInt(t/6e4/60/24,10)+1;return Date.ext.util.xPad(n,0,100)},m:function(e){return Date.ext.util.xPad(e.getMonth()+1,0)},M:["getMinutes","0"],p:function(e){return Date.ext.locales[e.locale].p[e.getHours()>=12?1:0]},P:function(e){return Date.ext.locales[e.locale].P[e.getHours()>=12?1:0]},S:["getSeconds","0"],u:function(e){var t=e.getDay();return t===0?7:t},U:function(e){var t=parseInt(Date.ext.formats.j(e),10),n=6-e.getDay(),r=parseInt((t+n)/7,10);return Date.ext.util.xPad(r,0)},V:function(e){var t=parseInt(Date.ext.formats.W(e),10),n=(new Date(""+e.getFullYear()+"/1/1")).getDay(),r=t+(n>4||n<=1?0:1);return r==53&&(new Date(""+e.getFullYear()+"/12/31")).getDay()<4?r=1:r===0&&(r=Date.ext.formats.V(new Date(""+(e.getFullYear()-1)+"/12/31"))),Date.ext.util.xPad(r,0)},w:"getDay",W:function(e){var t=parseInt(Date.ext.formats.j(e),10),n=7-Date.ext.formats.u(e),r=parseInt((t+n)/7,10);return Date.ext.util.xPad(r,0,10)},y:function(e){return Date.ext.util.xPad(e.getFullYear()%100,0)},Y:"getFullYear",z:function(e){var t=e.getTimezoneOffset(),n=Date.ext.util.xPad(parseInt(Math.abs(t/60),10),0),r=Date.ext.util.xPad(t%60,0);return(t>0?"-":"+")+n+r},Z:function(e){return e.toString().replace(/^.*\(([^)]+)\)$/,"$1")},"%":function(e){return"%"}},Date.ext.aggregates={c:"locale",D:"%m/%d/%y",h:"%b",n:"\n",r:"%I:%M:%S %p",R:"%H:%M",t:"	",T:"%H:%M:%S",x:"locale",X:"locale"},Date.ext.aggregates.z=Date.ext.formats.z(new Date),Date.ext.aggregates.Z=Date.ext.formats.Z(new Date),Date.ext.unsupported={},Date.prototype.strftime=function(e){this.locale in Date.ext.locales||(this.locale.replace(/-[a-zA-Z]+$/,"")in Date.ext.locales?this.locale=this.locale.replace(/-[a-zA-Z]+$/,""):this.locale="en-GB");var t=this;while(e.match(/%[cDhnrRtTxXzZ]/))e=e.replace(/%([cDhnrRtTxXzZ])/g,function(e,n){var r=Date.ext.aggregates[n];return r=="locale"?Date.ext.locales[t.locale][n]:r});var n=e.replace(/%([aAbBCdegGHIjmMpPSuUVwWyY%])/g,function(e,n){var r=Date.ext.formats[n];return typeof r=="string"?t[r]():typeof r=="function"?r.call(t,t):typeof r=="object"&&typeof r[0]=="string"?Date.ext.util.xPad(t[r[0]](),r[1]):n});return t=null,n};