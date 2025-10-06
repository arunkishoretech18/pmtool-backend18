import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    default: ""
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // basic email format validation
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
