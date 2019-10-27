import bcrypt from 'bcryptjs';
import timestamps from 'mongoose-timestamp';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // posts: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'post',
  //   },
  // ],
  avatarUrl: {
    type: String,
    required: true
  },
  // insertedAt: {
  //       type: Date,
  //       default: Date.now
  //   },
  // updatedAt: {
  //       type: Date,
  //       default: Date.now
  //   }
});
UserSchema.plugin(timestamps);
// mongoose.plugin(timestamps,  {
//   createdAt: 'created_at',
//   updatedAt: 'updated_at'
// });
UserSchema.pre('save', function() {
  const hashedPassword = bcrypt.hashSync(this.password, 12);
  this.password = hashedPassword;
});

const User = mongoose.model('User', UserSchema);

export default User;
