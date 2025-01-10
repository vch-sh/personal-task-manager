import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormStatus from '@/components/general/forms/FormStatus';
import SubmitButton from '@/components/general/forms/SubmitButton';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { updateUserWithImageUrl } from '@/actions/UpdateUserWithImageUrl';
import { uploadProfileImage } from '@/actions/UploadProfileImage';
import FormStatusType from '@/types/FormStatus';
import UploadProfileImageFormData from '@/types/UploadProfileImageFormData';

type UploadProfileImageFormProps = {
  selectedImage: File | null;
  setSelectedImage: Dispatch<SetStateAction<File | null>>;
};

export default function UploadProfileImageForm({
  selectedImage,
  setSelectedImage,
}: UploadProfileImageFormProps) {
  const [formStatus, setFormStatus] = useState<FormStatusType>({});
  const [isUploaded, setIsUploaded] = useState(false);

  const imageUploadRef = useRef<HTMLInputElement>(null);
  const MAX_MB = 1;
  const MAX_FILE_SIZE = MAX_MB * 1024 * 1024;

  const formMethods = useForm<UploadProfileImageFormData>({
    defaultValues: {
      image: null,
    },
  });

  async function onSubmit() {
    setFormStatus({});

    if (!selectedImage) {
      return { error: 'Image file is required' };
    }

    const response = await uploadProfileImage(selectedImage);

    const updatedUser = await updateUserWithImageUrl(
      response.profileImageUrl || '',
    );

    if (response?.error || updatedUser?.error) {
      setFormStatus({ error: response.error || updatedUser?.error });
      return;
    }

    if (response?.success || updatedUser?.success) {
      setFormStatus({ success: response.success || updatedUser?.success });
      setIsUploaded(true);
      return;
    }
  }

  return (
    <>
      <FormStatus status={formStatus} />

      <Form {...formMethods}>
        <form
          className="flex gap-4"
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          {!selectedImage || isUploaded ? (
            <FormField
              name="image"
              control={formMethods.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => imageUploadRef.current?.click()}
                    >
                      Upload Photo
                    </Button>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      className="hidden"
                      ref={imageUploadRef}
                      onChange={(e) => {
                        const file = e.target.files && e.target.files[0];

                        if (file && file.size > MAX_FILE_SIZE) {
                          formMethods.setError('image', {
                            type: 'manual',
                            message: `The file size must not exceed ${MAX_MB} MB`,
                          });
                          return;
                        }

                        formMethods.clearErrors('image');
                        field.onChange(file);
                        setSelectedImage(file);
                        setIsUploaded(false);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <SubmitButton
              label="Submit"
              isSubmitting={formMethods.formState.isSubmitting}
            />
          )}

          {!isUploaded && selectedImage && (
            <Button
              type="button"
              variant="ghost"
              className="font-semibold text-red-500 hover:bg-transparent hover:text-red-500"
              disabled={formMethods.formState.isSubmitting}
              onClick={() => {
                setSelectedImage(null);
                formMethods.setValue('image', null);
                formMethods.clearErrors('image');
              }}
            >
              Remove Photo
            </Button>
          )}
        </form>
      </Form>
    </>
  );
}
