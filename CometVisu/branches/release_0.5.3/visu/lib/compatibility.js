
if (typeof (console) == "undefined") {
    console = {};
    console.log = console.debug = console.info = console.warn = console.error = function() {}
}