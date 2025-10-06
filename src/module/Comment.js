import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = new Schema({
  content: { type: String, required: true },
  task_id: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

// Static methods
commentSchema.statics.createComment = function(data) {
  return this.create(data);
};
commentSchema.statics.getCommentsByTask = function(taskId) {
  return this.find({ task_id: taskId });
};

export default mongoose.model('Comment', commentSchema);
