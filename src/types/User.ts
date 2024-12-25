import { ObjectId } from 'mongodb';

type User = {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string | null;
  createdAt: Date;
  profileImage?: string;
};

export default User;
