function stringToXml(text) {
  var xmlDoc;
  if (window.DOMParser) {
    var parser = new DOMParser();
    xmlDoc = parser.parseFromString(text, 'text/xml');
  }
  else {
    xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
    xmlDoc.async = false;
    xmlDoc.loadXML(text);
  }
  return xmlDoc;
}
/**
 * @see http://stackoverflow.com/q/7616461/940217
 * @return {number}
 */
function hashCode(string) {
  if (Array.prototype.reduce){
    return string.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a;},0);
  }
  var hash = 0;
  if (string.length === 0) {
    return hash;
  }
  for (var i = 0, l = string.length; i < l; i++) {
    var character  = string.charCodeAt(i);
    hash  = ((hash<<5)-hash)+character;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

var timerId = null;
function debounce(innerFunc, delay) {
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(innerFunc, delay);
}

function saveConfig(filename, data) {
  return new Promise(function(resolve, reject) {
    $.ajax('../bin/save_config.php',
      {
        dataType: 'json',
        data: {
          config: filename,
          data: JSON.stringify([data]),
          configType: "string"
        },
        type: 'POST',
        cache: false,
        success: function (data) {
          if (!data) {
            // some weird generic error
            reject('configuration_saving_error');
            return;
          }

          if (data.success === false) {
            // we have an error.
            var message;

            if (data.message) {
              message = data.message;
            }
            reject("error saving config "+message);
            return;
          }

          // everything is pretty cool.
          resolve('configuration_saving_success');

        },
        error: function (jqXHR, textStatus, errorThrown) {
          reject('configuration_saving_error', textStatus, errorThrown);
        }
      }
    );
  });
}