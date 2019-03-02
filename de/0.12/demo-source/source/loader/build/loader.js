if (navigator.userAgent.indexOf("AppleWebKit/") != -1) {variant = "webkit";}
else if ((window.controllers || window.navigator.mozApps) && navigator.product === "Gecko") {variant = "gecko";}
else if (navigator.cpuClass && /MSIE\s+([^\);]+)(\)|;)/.test(navigator.userAgent) || /Trident/.test(navigator.userAgent)) {variant = "mshtml";}
else if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)){variant = "opera";}
var script = document.createElement("script"); script.type = "text/javascript"; script.src = "script/cv-" + variant + ".js"; document.getElementsByTagName('head')[0].appendChild(script);