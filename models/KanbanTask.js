import mongoose from 'mongoose'; 

const kanbanTaskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    duedate: Date,
    category: {
      type: String,
      required: true,
      enum: ["Backlog", "Doing", "Review", "Done"],
    },
    ownerId : {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: "True",
    }
  },
  {
    timestamps: true,
  },
);


export default mongoose.model('KanbanTask', kanbanTaskSchema); 