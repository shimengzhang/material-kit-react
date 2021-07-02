import React, { useEffect, useState } from 'react';

const LoadIframe = (props) => {
  useEffect(() => {
    document.domain = 'autohome.com.cn';
    const iframe = document.getElementById('myiframe');

    // 给 iframe 插入  script 标签
    function insertScript() {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//dev.autohome.com.cn:5000/test/circle.js';
      iframe.contentWindow.document.body.appendChild(script);
    }

    iframe.onload = () => {
      insertScript();
    };
  }, []);
  return (
    <iframe
      title="待埋点页面"
      id="myiframe"
      src="//local.autohome.com.cn:8000/automall/newcar/newcar"
      width="375"
      height="667"
      frameBorder="3"
      style={{
        marginTop: '100px',
        marginLeft: '50%',
        transform: 'translateX(-50%)'
      }}
    />
  );
};

export default LoadIframe;
