type Task = {
  _id: string;
  userId: string;
  text: string;
  status: 'to-do' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  category: 'all' | string;
  dueDate: Date | null;
  createdAt: Date;
};

export default Task;
