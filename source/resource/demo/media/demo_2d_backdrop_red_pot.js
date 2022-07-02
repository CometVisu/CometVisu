// import namespaces from parent window
const parent_cv = window.parent.cv;
const model = parent_cv.data.Model.getInstance();

const thisGA = '12/7/52';
const thisTransform = 'DPT:5.001';

function update(address, data) // overload the handler
{
  const h = parent_cv.Transform.decode({transform: thisTransform}, data);
  if (h === undefined || isNaN(h)) {
    return;
  }
  let filling = document.querySelector('#rect3855');
  filling.y.baseVal.value=200.57388 + (100-h)*2;
  filling.height.baseVal.value = h*2;
  document.querySelector('#path3029-4').setAttribute('d', 'm 524.85653,'+(200.57388+ (100-h)*2)+' a 100,37.795274 0 0 1 -200,0 100,37.795274 0 1 1 200,0 z');
}

model.addUpdateListener(thisGA, update, this);