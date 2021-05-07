const Router = require('koa-router');
const jwt = require('koa-jwt');
const { secret } = require('../config');
const {
  find,
  findById,
  update,
  create,
  del,
  checkQuestionExist,
  checkQuestioner,
} = require('../controllers/questions');

const router = new Router({ prefix: '/questions' });
const auth = jwt({ secret });
// 获取问题列表
router.get('/', find);

// 新增问题
router.post('/', auth, create);

// 获取特定问题
router.get('/:id', checkQuestionExist, findById);

// 更新特定问题
// router.put('/:id', update); // put 是整体替换
router.patch('/:id', auth, checkQuestionExist, checkQuestioner, update); // patch 是部分替换

router.delete('/:id', auth, checkQuestionExist, checkQuestioner, del);

module.exports = router;
