import { ObjectId } from 'mongodb';

type AddEditTaskFormData = {
  text: string;
  status: 'to-do' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  category: 'all' | string;
  dueDate: Date | null;
  _id?: ObjectId;
  userId?: ObjectId;
  createdAt?: Date;
  editedAt?: Date;
};

export default AddEditTaskFormData;
