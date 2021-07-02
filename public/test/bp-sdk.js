const bpList = [
  {
    xpath: '/html[1]/body[1]/div[@class="parent"]/div[@class="son"]',
    type: 'click',
  },
  {
    xpath: '/html[1]/body[1]/div[@class="parent"]/div[@class="son1"]',
    type: 'click',
  },
  {
    xpath: '/html[1]/body[1]/div[@class="parent"]/div[@class="son"]',
    type: 'show',
  },
  {
    xpath: '/html[1]/body[1]/div[@class="parent"]/div[@class="son1"]',
    type: 'show',
  },
];

const clickList = bpList
  .filter(({ type }) => type === 'click')
  .map(({ xpath }) => xpath);
console.log('clickList', clickList);
function tongjiExtends(obj) {
  if (!trackCustomEvent) {
    return;
  }
  trackCustomEvent(
    'auto_common_event',
    {
      biz: 'auto',
      type: obj.type || 'click',
      action: obj.action,
      ctime: new Date().getTime(),
      area: obj.area || 'bottom',
      element: 'details',
      pmark: '0',
    },
    {
      enid: obj.enid,
      sourceid: obj.sourceid,
      cityid: obj.cityid || 110100,
      userid: obj.userid || 0,
    },
  );
}

function x(xpath) {
  var result = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.ANY_TYPE,
    null,
  );
  return result.iterateNext();
}

// 获取元素 xpath
function XPath(elm) {
  for (segs = []; elm && elm.nodeType == 1; elm = elm.parentNode) {
    if (elm.hasAttribute('id')) {
      segs.unshift('id("' + elm.getAttribute('id') + '")');
      return segs.join('/');
    } else if (elm.classList.length) {
      const arr = Array.from(elm.classList);
      const index = arr.indexOf('bp-circled-style');
      if (index > -1) {
        arr.splice(index, 1);
      }
      if (arr.length) {
        segs.unshift(
          elm.localName.toLowerCase() + '[@class="' + arr.join(' ') + '"]',
        );
      }
    } else {
      for (i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling)
        if (sib.localName == elm.localName) i++;
      segs.unshift(elm.localName.toLowerCase() + '[' + i + ']');
    }
  }
  return segs.length ? '/' + segs.join('/') : null;
}

const clickEle = x(bpList[0].xpath);

// 所有子元素
// 当前元素
// 同级元素

document.addEventListener('click', (e) => {
  if (clickList.includes(XPath(e.target))) {
    tongjiExtends({
      action: 'app_trade_tj_kp_click',
      enid: 6842494,
      sourceid: 6842494,
      cityid: '110108',
      userid: 0,
    });
  }
});

var pvTrack = {};
pvTrack.site = 1211139; //一级频道
pvTrack.category = 1633; //二级频道
pvTrack.subcategory = 20192; //三级频道
pvTrack.object = 0;
pvTrack.type = 0;
pvTrack.typeid = 0;
pvTrack.series = 0;
pvTrack.spec = 0;
pvTrack.level = 0;
pvTrack.dealer = 0;
pvTrack.pageVars = {
  enid: 6842494,
  sourceid: 6842494,
};

(function (doc) {
  var _as = doc.createElement('script');
  _as.type = 'text/javascript';
  _as.async = true;
  _as.src =
    'https://x.autoimg.cn/bi/mda/ahas_body.min.js?d=' +
    new Date().toLocaleDateString().replace(/\//g, '');
  var s = doc.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(_as, s);
})(document);
