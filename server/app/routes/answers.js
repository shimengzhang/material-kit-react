const Router = require('koa-router');
const jwt = require('koa-jwt');
const { secret } = require('../config');
const {
  find,
  findById,
  update,
  create,
  del,
  checkAnswerExist,
  checkAnswerer,
} = require('../controllers/answers');

const router = new Router({ prefix: '/questions/:questionId/answers' });
const auth = jwt({ secret });
// 获取问题列表
router.get('/', find);

// 新增问题
router.post('/', auth, create);

// 获取特定问题
router.get('/:id', checkAnswerExist, findById);

// 更新特定问题
// router.put('/:id', update); // put 是整体替换
router.patch('/:id', auth, checkAnswerExist, checkAnswerer, update); // patch 是部分替换

router.delete('/:id', auth, checkAnswerExist, checkAnswerer, del);

module.exports = router;
