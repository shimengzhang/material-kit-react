const Router = require('koa-router');
const jwt = require('koa-jwt');
const { secret } = require('../config');
const {
  find,
  findById,
  update,
  create,
  listFollowers: listTopicFollowers,
  checkTopicExist,
  listQuestions,
} = require('../controllers/topics');

const router = new Router({ prefix: '/topics' });
const auth = jwt({ secret });
// 获取话题列表
router.get('/', find);

// 新增话题
router.post('/', auth, create);

// 获取特定话题
router.get('/:id', checkTopicExist, findById);

// 获取话题的关注者列表
router.get('/:id/followers', checkTopicExist, listTopicFollowers);

// 更新特定话题
// router.put('/:id', update); // put 是整体替换
router.patch('/:id', auth, checkTopicExist, update); // patch 是部分替换

router.get('/:id/questions', checkTopicExist, listQuestions);

module.exports = router;
