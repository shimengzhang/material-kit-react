const style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
    .bp-circled-style {
      outline: 1px solid red !important;
      outline-offset: -1px !important;
    }
    `;
document.getElementsByTagName('head')[0].appendChild(style);

// 鼠标进入添加红框
document.addEventListener('mouseover', (e) => {
  // console.log(e.target);
  e.target.classList.add('bp-circled-style');
});
// 鼠标离开移除红框
document.addEventListener('mouseout', (e) => {
  // console.log(e.target);
  e.target.classList.remove('bp-circled-style');
});

// 获取元素 xpath
function XPath(elm) {
  for (segs = []; elm && elm.nodeType == 1; elm = elm.parentNode) {
    if (elm.hasAttribute('id')) {
      segs.unshift(`id("${elm.getAttribute('id')}")`);
      return segs.join('/');
    }
    if (elm.classList.length) {
      const arr = Array.from(elm.classList);
      const index = arr.indexOf('bp-circled-style');
      if (index > -1) {
        arr.splice(index, 1);
      }
      if (arr.length) {
        segs.unshift(
          `${elm.localName.toLowerCase()}[@class="${arr.join(' ')}"]`
        );
      }
    } else {
      for (i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) {
        if (sib.localName == elm.localName) i++;
      }
      segs.unshift(`${elm.localName.toLowerCase()}[${i}]`);
    }
  }
  return segs.length ? `/${segs.join('/')}` : null;
}

// 元素点击上报 xpath
// document.addEventListener(
//   'click',
//   (e) => {
//     console.log(XPath(e.target));
//     window.parent.postMessage(XPath(e.target), '*');
//   },
//   false
// );

// 元素右键点击上报 xpath
document.oncontextmenu = (e) => {
  console.log('right', e.target);
  console.log(XPath(e.target));
  window.parent.postMessage(
    {
      xpath: XPath(e.target)
    },
    '*'
  );
  e.preventDefault();
};
