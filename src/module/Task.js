import mongoose from 'mongoose';
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: 'pending' },
  project_id: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // Assignee/Creator
  dueDate: Date,
}, { timestamps: true });

// Static methods
taskSchema.statics.createTask = function(data) {
  return this.create(data);
};
taskSchema.statics.getTasksByProject = function(projectId) {
  return this.find({ project_id: projectId });
};

export default mongoose.model('Task', taskSchema);
