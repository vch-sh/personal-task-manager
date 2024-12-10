import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import FormStatus from '@/components/general/forms/FormStatus';
import SubmitButton from '@/components/general/forms/SubmitButton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { addCategory } from '@/actions/AddCategory';
import { colorVariants } from '@/lib/taskCategoriesColors';
import AddCategoryFormData from '@/types/AddCategoryFormData';
import FormStatusType from '@/types/FormStatus';

type AddCategoryFormProps = {
  handleDialogClose: () => void;
};

export default function AddCategoryForm({
  handleDialogClose,
}: AddCategoryFormProps) {
  const [formStatus, setFormStatus] = useState<FormStatusType>({});

  const { data: session } = useSession();

  const formMethods = useForm<AddCategoryFormData>({
    defaultValues: {
      userId: session?.user.id,
      name: '',
      color: 'default',
    },
    mode: 'onChange',
  });

  async function onSubmit(data: AddCategoryFormData) {
    setFormStatus({});

    try {
      const response = await addCategory(data);

      if (response?.error) {
        setFormStatus({ error: response.error });
        return;
      }

      if (response?.success) {
        setFormStatus({ success: response.success });
        handleDialogClose();
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        setFormStatus({ error: 'Something went wrong' });
      } else {
        setFormStatus({ error: 'Unknown error occurred. Please try later.' });
      }
    }
  }

  return (
    <Form {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 "
      >
        <FormField
          control={formMethods.control}
          name="name"
          rules={{
            required: 'Name is required',
            maxLength: {
              value: 30,
              message: 'Max 30 characters',
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name" className="font-semibold">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  id="name"
                  placeholder="Enter category name..."
                  {...field}
                  onChange={(e) => {
                    const lowercaseValue = e.target.value.toLowerCase();
                    formMethods.setValue('name', lowercaseValue);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formMethods.control}
          name="color"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel htmlFor="color" className="font-semibold">
                Color
              </FormLabel>
              <FormControl>
                <RadioGroup
                  {...field}
                  onValueChange={(value) => field.onChange(value)}
                  className="flex flex-wrap justify-between"
                >
                  {Object.entries(colorVariants).map(([key, value], index) => (
                    <fieldset
                      key={`${key}${value}-${index}`}
                      className="flex items-center"
                    >
                      <RadioGroupItem
                        value={key}
                        id={`${key}${value}-${index}`}
                        className="hidden"
                      />
                      <Label
                        htmlFor={`${key}${value}-${index}`}
                        className={`${value} ${
                          field.value === key &&
                          'ring-2 ring-offset-2 ring-gray-600'
                        } h-8 w-8 shadow-md rounded-sm focus:ring-2 ring-offset-2 focus:ring-gray-500 focus:outline-none cursor-pointer `}
                      />
                    </fieldset>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormStatus status={formStatus} />

        <SubmitButton
          label="Add"
          isSubmitting={formMethods.formState.isSubmitting}
        />
      </form>
    </Form>
  );
}
