import UserImage from '@/components/general/UserImage';
import { Button } from '@/components/ui/button';

export default function UploadProfileImage() {
  return (
    <section className="mb-4 flex flex-col items-center justify-center gap-4">
      <UserImage width={100} height={100} />
      <div className="flex gap-4">
        <Button variant="outline">Upload Photo</Button>
        <Button variant="ghost" className="text-red-500 hover:text-red-500">
          Remove Photo
        </Button>
      </div>
    </section>
  );
}
