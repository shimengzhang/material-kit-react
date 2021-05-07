const Answer = require('../models/answers');
const User = require('../models/users');

class AnswersController {
  async find(ctx) {
    const { page = 1, page_size = 3, q = '' } = ctx.query;
    const curPage = Math.max(page * 1, 1) - 1;
    const pageSize = Math.max(page_size * 1, 1);
    const reg = new RegExp(q);
    // 既匹配 title 又匹配 description
    ctx.body = await Answer.find({
      content: reg,
      questionId: ctx.params.questionId,
    })
      .limit(pageSize)
      .skip(curPage * pageSize);
  }

  async checkAnswerExist(ctx, next) {
    const answer = await Answer.findById(ctx.params.id).select('+answerer');
    if (!answer) {
      ctx.throw(404, `答案 ${ctx.params.id} 不存在`);
    }
    // 只有在删改查此答案时，才检查此逻辑；赞和踩答案时，不检查
    if (ctx.params.questionId && answer.questionId !== ctx.params.questionId) {
      ctx.throw(404, `该问题下不存在此答案`);
    }
    ctx.state.answer = answer;
    await next();
  }

  async findById(ctx) {
    const { fields = '' } = ctx.query;
    const selectFields = fields
      .split(';')
      .filter((f) => f)
      .map((f) => `+${f} `)
      .join();
    console.log(selectFields);
    const answer = await Answer.findById(ctx.params.id)
      .select(selectFields)
      .populate('answerer');
    if (!answer) {
      ctx.throw(404, '问题不存在');
    }
    ctx.body = answer;
  }

  async create(ctx) {
    ctx.verifyParams({
      content: { type: 'string', required: true },
    });
    const answer = await new Answer({
      ...ctx.request.body,
      answerer: ctx.state.user._id,
      questionId: ctx.params.questionId,
    }).save();
    ctx.body = answer;
  }

  async checkAnswerer(ctx, next) {
    const { answer, user } = ctx.state;
    if (answer.answerer.toString() !== user._id) {
      ctx.throw(403, '没有权限');
    }
    await next();
  }

  async update(ctx) {
    ctx.verifyParams({
      content: { type: 'string', required: false },
    });
    await ctx.state.answer.update(ctx.request.body);

    ctx.body = ctx.state.answer;
  }

  async del(ctx) {
    await Answer.findByIdAndRemove(ctx.params.id);
    ctx.status = 204;
  }
}

module.exports = new AnswersController();
