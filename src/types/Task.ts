import { ObjectId } from 'mongodb';

type Task = {
  userId: ObjectId;
  text: string;
  status: 'to-do' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date | null;
};

export default Task;
