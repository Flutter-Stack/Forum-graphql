import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const ThreadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  body: {
    type : String
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  // posts: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Post',
  // }],
});
ThreadSchema.plugin(timestamps);
const Thread = mongoose.model('Thread', ThreadSchema);

export default Thread;
