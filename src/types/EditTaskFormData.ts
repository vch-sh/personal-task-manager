import Task from './Task';

type EditTaskFormData = Omit<Task, '_id' | 'userId' | 'createdAt'> & {
  editedAt: Date;
};

export default EditTaskFormData;
