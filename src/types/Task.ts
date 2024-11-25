type Task = {
  id: string;
  text: string;
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: Date | null;
};

export default Task;
