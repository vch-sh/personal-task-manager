import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import UpdateProfileForm from './UpdateProfileForm';
import UploadProfileImage from './UploadProfileImage';

export default function ProfileSettingsContent() {
  return (
    <Card className="mt-4">
      <CardHeader className="text-center">
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your profile details</CardDescription>
      </CardHeader>
      <CardContent>
        <UploadProfileImage />
        <UpdateProfileForm />
      </CardContent>
    </Card>
  );
}
