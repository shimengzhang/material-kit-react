const path = require('path');

class HomeController {
  async index(ctx) {
    // a.b;
    ctx.body = '根域名';
  }

  async upload(ctx) {
    const file = ctx.request.files.file;
    const basename = path.basename(file.path);
    ctx.body = { url: `${ctx.origin}/uploads/${basename}` };
  }
}

module.exports = new HomeController();
