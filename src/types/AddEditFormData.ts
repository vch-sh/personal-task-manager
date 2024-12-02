import { ObjectId } from 'mongodb';

type AddEditFormData = {
  text: string;
  status: 'to-do' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date | null;
  _id?: ObjectId;
  userId?: ObjectId;
  createdAt?: Date;
  editedAt?: Date;
};

export default AddEditFormData;
