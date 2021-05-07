const Topic = require('../models/topics');
const User = require('../models/users');
const Question = require('../models/questions');

class TopicsController {
  async find(ctx) {
    const { page = 1, page_size = 3, q = '' } = ctx.query;
    const curPage = Math.max(page * 1, 1) - 1;
    const pageSize = Math.max(page_size * 1, 1);
    ctx.body = await Topic.find({
      name: new RegExp(q),
    })
      .limit(pageSize)
      .skip(curPage * pageSize);
  }

  async findById(ctx) {
    const { fields = '' } = ctx.query;
    const selectFields = fields
      .split(';')
      .filter((f) => f)
      .map((f) => `+${f} `)
      .join();

    const topic = await Topic.findById(ctx.params.id).select(selectFields);
    if (!topic) {
      ctx.throw(404, '话题不存在');
    }
    ctx.body = topic;
  }

  async create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      avatar_url: { type: 'string', required: false },
      introduction: { type: 'string', required: false },
    });
    const topic = await new Topic(ctx.request.body).save();
    ctx.body = topic;
  }

  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      avatar_url: { type: 'string', required: false },
      introduction: { type: 'string', required: false },
    });
    const topic = await Topic.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body,
    );
    if (!topic) {
      ctx.throw(404, '话题不存在');
    }
    ctx.body = topic;
  }

  async checkTopicExist(ctx, next) {
    const topic = await Topic.findById(ctx.params.id);
    if (!topic) {
      ctx.throw(404, `话题 ${ctx.params.id} 不存在`);
    }
    await next();
  }

  async listFollowers(ctx) {
    const users = await User.find({
      followingTopics: { $in: [ctx.params.id] },
    });
    ctx.body = users;
  }

  async listQuestions(ctx) {
    const questions = await Question.find({
      topics: ctx.params.id,
    });

    ctx.body = questions;
  }
}

module.exports = new TopicsController();
