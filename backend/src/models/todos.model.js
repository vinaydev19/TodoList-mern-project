import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  todoId: {
    type: Date,
    required: true,
  },
  todo: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
});

export const Todo = mongoose.model("Todo", todoSchema);
