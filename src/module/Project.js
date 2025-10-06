import mongoose from 'mongoose';
const { Schema } = mongoose;

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: Date,
  endDate: Date,
}, { timestamps: true });

// Static methods
projectSchema.statics.createProject = function(data) {
  return this.create(data);
};
projectSchema.statics.getProjectsByUser = function(userId) {
  return this.find({ owner: userId });
};

export default mongoose.model('Project', projectSchema);
