import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Content is required"],
    trim: true,
  },
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: [true, "Task ID is required"],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
}, { timestamps: true });

// Index for performance
commentSchema.index({ task_id: 1, user_id: 1 });

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;