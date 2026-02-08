import KanbanTask from "../models/KanbanTask.js";

const createKanbanTask = async (req, res, next) => {
  //   console.log("In kanbanController ", req.body);
  const { title, description, duedate, category } = req.body;
  const kanbanTask = new KanbanTask({
    title,
    description,
    duedate,
    category,
    ownerId: req.user.id,
  });
  await kanbanTask.save();
  res.status(201).json(kanbanTask);
};

const getKanbanTasks = async (req, res, next) => {
  const allTasks = await KanbanTask.find({ ownerId: req.user.id });
  res.json(allTasks);
};

const updateTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedFields = req.body;
    //   console.log(updatedFields);
    const updated = await KanbanTask.findOneAndUpdate(
      { _id: id, ownerId: req.user.id },
      { $set: updatedFields },
      { new: true, runValidators: true },
    );
    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updated);
  } catch {
    res.status(500).json({ message: "Update Failed" });
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleted = await KanbanTask.findOneAndDelete({_id: id, ownerId: req.user.id});
    if(!deleted) {
      return res.status(404).json({message: "Task not found"})
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch {}
};

export default { createKanbanTask, getKanbanTasks, updateTask, deleteTask };
