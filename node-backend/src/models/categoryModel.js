import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';
import mongoosePaginate from 'mongoose-paginate-v2';

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
});
CategorySchema.plugin(timestamps);
CategorySchema.plugin(mongoosePaginate);
const Category = mongoose.model('Category', CategorySchema);
export default Category;
