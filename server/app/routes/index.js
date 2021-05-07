const fs = require('fs');

// 自动扫描路由文件，并自动注册
module.exports = (app) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === 'index.js') return;
    const router = require(`./${file}`);
    app.use(router.routes()).use(router.allowedMethods()); // 响应 option 请求
  });
};
