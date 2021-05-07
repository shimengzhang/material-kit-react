const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    // _id: { type: String, select: false },
    __v: { type: Number, select: false },
    name: { type: String, required: true },
    password: { type: String, required: true, select: false },
    avatar_url: { type: String, select: false },
    gender: {
      type: String,
      enum: ['male', 'female'],
      default: 'male',
      select: false,
    },
    headline: { type: String, select: false },
    locations: {
      select: false,
      type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    },
    business: { type: Schema.Types.ObjectId, ref: 'Topic', select: false },
    employments: {
      type: [
        {
          company: { type: Schema.Types.ObjectId, ref: 'Topic' },
          job: { type: Schema.Types.ObjectId, ref: 'Topic' },
        },
      ],
      select: false,
    },
    educations: {
      type: [
        {
          school: { type: Schema.Types.ObjectId, ref: 'Topic' },
          major: { type: Schema.Types.ObjectId, ref: 'Topic' },
          diploma: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
          },
          entrance_year: {
            type: Number,
          },
          graduation_year: {
            type: Number,
          },
        },
      ],
      select: false,
    },
    following: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      select: false,
    },
    followingTopics: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
      select: false,
    },
    likingAnswers: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
      select: false,
    },
    dislikingAnswers: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
      select: false,
    },
    collectingAnswers: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
      select: false,
    },
  },
  { timestamps: true },
);

module.exports = model('User', userSchema);
