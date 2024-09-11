// Task.js

import { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
  name: { type: String, required: true },
  dueDate: { type: Date },
  category: { type: String },
  completed: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export default model('Task', TaskSchema);
