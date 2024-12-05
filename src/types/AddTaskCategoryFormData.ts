import { ObjectId } from 'mongodb';

type AddTaskCategoryFormData = {
  userId: ObjectId;
  name: string;
  color: string;
};

export default AddTaskCategoryFormData;
