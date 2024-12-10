type AddEditTaskFormData = {
  text: string;
  status: 'to-do' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  category: 'all' | string;
  dueDate: Date | null;
  _id?: string;
  userId?: string;
  createdAt?: Date;
  editedAt?: Date;
};

export default AddEditTaskFormData;
