const Router = require('koa-router');
const jwt = require('koa-jwt');
const { secret } = require('../config');
const {
  find,
  findById,
  update,
  create,
  del,
  login,
  checkOwner,
  checkUserExist,
  listFollowing,
  listFollowers,
  follow,
  unfollow,
  followTopic,
  unfollowTopic,
  listFollowingTopics,
  listQuestions,
  listLikingAnswers,
  listdisLikingAnswers,
  likeAnswer,
  dislikeAnswer,
  unlikeAnswer,
  undislikeAnswer,
  collectAnswer,
  uncollectAnswer,
  listcollectAnswers,
} = require('../controllers/users');
const { checkTopicExist } = require('../controllers/topics');
const { checkAnswerExist } = require('../controllers/answers');

const router = new Router({ prefix: '/users' });
const auth = jwt({ secret });
// 获取用户列表
router.get('/', find);

// 新增用户
router.post('/', create);

// 获取特定用户
router.get('/:id', findById);

// 更新特定用户
// router.put('/:id', update); // put 是整体替换
router.patch('/:id', auth, checkOwner, update); // patch 是部分替换

// 删除特定用户
router.delete('/:id', auth, checkOwner, del);

// 登录
router.post('/login', login);

// 获取粉丝
router.get('/:id/following', listFollowing);

// 获取我关注的人
router.get('/:id/followers', listFollowers);

// 关注某人
router.put('/following/:id', auth, checkUserExist, follow);

// 取消关注
router.put('/unfollowing/:id', auth, checkUserExist, unfollow);

// 关注某话题
router.put('/followingTopic/:id', auth, checkTopicExist, followTopic);

// 取消关注话题
router.put('/unfollowingTopic/:id', auth, checkTopicExist, unfollowTopic);

// 获取用户关注的话题列表
router.get('/:id/followingTopic', listFollowingTopics);

// 获取用户的问题列表
router.get('/:id/questions', listQuestions);

// 赞某答案
router.put(
  '/likingAnswers/:id',
  auth,
  checkAnswerExist,
  likeAnswer,
  undislikeAnswer,
);

// 取消赞某答案
router.put('/unLikingAnswers/:id', auth, checkAnswerExist, unlikeAnswer);

// 获取用户赞过的答案列表
router.get('/:id/listLikingAnswers', listLikingAnswers);

// 踩某答案
router.put(
  '/disLikingAnswers/:id',
  auth,
  checkAnswerExist,
  dislikeAnswer,
  unlikeAnswer,
);

// 取消踩某答案
router.put('/undisLikingAnswers/:id', auth, checkAnswerExist, undislikeAnswer);

// 获取用户踩过的答案列表
router.get('/:id/listdisLikingAnswers', listdisLikingAnswers);

// 收藏答案
router.put('/collectingAnswers/:id', auth, checkAnswerExist, collectAnswer);

// 取消收藏答案
router.put('/uncollectingAnswers/:id', auth, checkAnswerExist, uncollectAnswer);

// 获取用户收藏的答案列表
router.get('/:id/listcollectingAnswers', listcollectAnswers);

module.exports = router;
