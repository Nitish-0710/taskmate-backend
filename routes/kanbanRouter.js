import express from 'express'; 

const kanbanRouter = express.Router()

import kanbanController from '../controllers/kanbanController.js';
import requireAuth from '../src/middleware/authMiddleware.js';

kanbanRouter.use(requireAuth);

kanbanRouter.post('/', kanbanController.createKanbanTask)
kanbanRouter.get('/', kanbanController.getKanbanTasks)
kanbanRouter.put('/:id/update', kanbanController.updateTask)
kanbanRouter.delete('/:id/delete', kanbanController.deleteTask)

export default kanbanRouter; 