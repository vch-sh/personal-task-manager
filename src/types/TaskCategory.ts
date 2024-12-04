import { ObjectId } from 'mongodb';

type TaskCategory = {
  _id: ObjectId | 'all';
  name: string;
};

export default TaskCategory;
