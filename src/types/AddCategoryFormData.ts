import { ObjectId } from 'mongodb';

type AddCategoryFormData = {
  userId: ObjectId;
  name: string;
  color: string;
};

export default AddCategoryFormData;
