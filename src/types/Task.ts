import { ObjectId } from 'mongodb';

type Task = {
  _id: ObjectId;
  userId: ObjectId;
  text: string;
  status: 'to-do' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date | null;
  createdAt: Date;
};

export default Task;
