// import namespaces from parent window
var qx = window.parent.qx;
var cv = window.parent.cv;

var
  thisGA = '12/7/52',
  thisTransform = 'DPT:5.001',
  client = cv.Application.createClient('default');

client.update = function(json ) // overload the handler
{
  var h = cv.Transform.decode(thisTransform, json[thisGA] );
  if (h === undefined) {
    return;
  }
  var filling = qx.bom.Selector.query('#rect3855', document)[0];
  filling.y.baseVal.value=200.57388 + (100-h)*2;
  filling.height.baseVal.value = h*2;
  qx.bom.element.Attribute.set(qx.bom.Selector.query('#path3029-4', document)[0], 'd', 'm 524.85653,'+(200.57388+ (100-h)*2)+' a 100,37.795274 0 0 1 -200,0 100,37.795274 0 1 1 200,0 z');
};
  
client.user = 'demo_user'; // example for setting a user
client.subscribe( [thisGA] );
