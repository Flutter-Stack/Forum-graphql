import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const PostSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thread',
  }
});

PostSchema.plugin(timestamps);
const Post = mongoose.model('Post', PostSchema);

export default Post;
