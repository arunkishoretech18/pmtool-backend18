import mongoose from "mongoose";

    const taskSchema = new mongoose.Schema({
      title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      status: {
        type: String,
        enum: ["To Do", "In Progress", "Done", "pending"],
        default: "pending",
      },
      dueDate: {
        type: Date,
      },
      project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: [true, "Project ID is required"],
      },
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
      },
    }, { timestamps: true });

    taskSchema.index({ project_id: 1, user_id: 1 });

    const Task = mongoose.model("Task", taskSchema);
    export default Task;