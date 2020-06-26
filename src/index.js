const inp = document.getElementsByClassName('selector')[0];
const butFind = document.getElementsByClassName('selector-find')[0];
const butNext = document.getElementsByClassName('selector-next')[0];
const butPrev = document.getElementsByClassName('selector-prev')[0];
const tops = document.getElementsByClassName('nav-top')[0];
const bottom = document.getElementsByClassName('nav-bottom')[0];
const left = document.getElementsByClassName('nav-left')[0];
const right = document.getElementsByClassName('nav-right')[0];
let searchSel = '';
let parentSel = '';
let sel = '';
let timer = 0;

const style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.select {outline: solid red 5px;background-color: lightblue;}';
document.getElementsByTagName('head')[0].appendChild(style);

function clears(param) {
  const res = param.slice(1, param.length);
  if (res.trim() !== undefined && res.trim() !== '') {
    const arr = document.querySelectorAll(param);
    if (parentSel !== '') parentSel.classList.remove('select');
    for (let i = 0; i < arr.length; i += 1) {
      arr[i].classList.remove('select');
    }
  }
}

function buttonOff() {
  butNext.disabled = true;
  butPrev.disabled = true;
}

function buttonOn() {
  tops.disabled = false;
  bottom.disabled = false;
  left.disabled = false;
  right.disabled = false;
}

butFind.onclick = function click() {
  timer = 0;
  const text = inp.value.trim();
  if (text !== undefined && text !== '') {
    const arr = document.querySelectorAll(text);
    if (arr.length > 1) {
      butNext.disabled = false;
      butPrev.disabled = false;
    }
    clears(searchSel);
    searchSel = text;
    clears(searchSel);
    buttonOn();
    if (arr[timer] !== undefined) arr[timer].classList.add('select');
  }
};
butNext.onclick = function click() {
  const arr = document.querySelectorAll(searchSel);
  if (arr.length > 1 && timer < arr.length - 1) {
    timer += 1;
    if (searchSel !== '') {
      clears(searchSel);
      sel = arr[timer];
      arr[timer].classList.add('select');
    }
  }
};
butPrev.onclick = function click() {
  const arr = document.querySelectorAll(searchSel);
  if (arr.length > 1 && timer > 0) {
    timer -= 1;
    if (searchSel !== '') {
      clears(searchSel);
      sel = arr[timer];
      arr[timer].classList.add('select');
    }
  }
};

function buttonsClick(operation) {
  return function test() {
    const elem = operation();
    if (elem == null) return 0;
    clears(searchSel);
    elem.classList.add('select');
    parentSel = elem;
    buttonOff();
    return null;
  };
}

tops.onclick = buttonsClick(function click() {
  return sel.parentNode;
});
bottom.onclick = buttonsClick(function click() {
  return sel.firstElementChild;
});
left.onclick = buttonsClick(function click() {
  return sel.previousElementSibling;
});
right.onclick = buttonsClick(function click() {
  return sel.nextElementSibling;
});
