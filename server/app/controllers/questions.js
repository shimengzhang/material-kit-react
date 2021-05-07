const Question = require('../models/questions');
const User = require('../models/users');

class QuestionsController {
  async find(ctx) {
    const { page = 1, page_size = 3, q = '' } = ctx.query;
    const curPage = Math.max(page * 1, 1) - 1;
    const pageSize = Math.max(page_size * 1, 1);
    const reg = new RegExp(q);
    // 既匹配 title 又匹配 description
    ctx.body = await Question.find({
      $or: [{ title: reg }, { description: reg }],
    })
      .limit(pageSize)
      .skip(curPage * pageSize);
  }

  async checkQuestionExist(ctx, next) {
    const question = await Question.findById(ctx.params.id).select(
      '+questioner',
    );
    if (!question) {
      ctx.throw(404, `问题 ${ctx.params.id} 不存在`);
    }
    ctx.state.question = question;
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
    const question = await Question.findById(ctx.params.id)
      .select(selectFields)
      .populate('questioner topics');
    if (!question) {
      ctx.throw(404, '问题不存在');
    }
    ctx.body = question;
  }

  async create(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: true },
      description: { type: 'string', required: false },
    });
    const question = await new Question({
      ...ctx.request.body,
      questioner: ctx.state.user._id,
    }).save();
    ctx.body = question;
  }

  async update(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: false },
      description: { type: 'string', required: false },
    });
    await ctx.state.question.update(ctx.request.body);

    ctx.body = ctx.state.question;
  }

  async checkQuestioner(ctx, next) {
    const { question, user } = ctx.state;
    if (question.questioner.toString() !== user._id) {
      ctx.throw(403, '没有权限');
    }
    await next();
  }

  async del(ctx) {
    await Question.findByIdAndRemove(ctx.params.id);
    ctx.status = 204;
  }
}

module.exports = new QuestionsController();
