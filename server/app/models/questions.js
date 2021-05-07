const { Schema, model } = require('mongoose');

const questionSchema = new Schema(
  {
    __v: { type: String, select: false },
    title: { type: String, required: true },
    description: { type: String, select: false },
    questioner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      select: false,
    },
    topics: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
      select: false,
    },
  },
  { timestamps: true },
);

module.exports = model('Question', questionSchema);
