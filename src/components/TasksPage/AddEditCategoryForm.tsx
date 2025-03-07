import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
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
import { colorVariants } from '@/lib/taskCategoriesColors';
import { useTaskCategory } from '@/hooks/useTaskCategory';
import AddEditCategoryFormData from '@/types/AddEditCategoryFormData';
import FormStatusType from '@/types/FormStatus';

type AddEditCategoryFormProps = {
  id?: string;
  handleDialogClose: () => void;
  action: (data: AddEditCategoryFormData) => Promise<
    | {
        error: string;
        success?: undefined;
        categoryId?: undefined;
      }
    | {
        success: string;
        categoryId: string | undefined;
        error?: undefined;
      }
  >;
};

export default function AddEditCategoryForm({
  handleDialogClose,
  action,
}: AddEditCategoryFormProps) {
  const [formStatus, setFormStatus] = useState<FormStatusType>({});
  const [textLength, setTextLength] = useState(0);
  const { setCategory } = useTaskCategory();

  const formMethods = useFormContext<AddEditCategoryFormData>();

  async function onSubmit(data: AddEditCategoryFormData) {
    setFormStatus({});

    try {
      const response = await action(data);

      if (response?.error) {
        setFormStatus({ error: response.error });
        return;
      }

      if (response?.success) {
        setFormStatus({ success: response.success });
        handleDialogClose();
        setCategory({
          _id: response.categoryId || '',
          name: data.name,
          color: data.color,
        });
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
        className="flex flex-col gap-4"
      >
        <FormField
          control={formMethods.control}
          name="name"
          rules={{
            required: 'Name is required',
            maxLength: {
              value: 25,
              message: 'Max 25 characters',
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="name"
                className="flex items-center font-semibold dark:font-normal"
              >
                <span className="dark:text-neutral-50/90">Name</span>
                {textLength >= 20 && (
                  <span className="ml-auto text-xs">
                    {formMethods.watch('name').length}/25
                  </span>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  id="name"
                  placeholder="Enter category name..."
                  className="dark:text-neutral-50/90"
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => {
                    const lowercaseValue = e.target.value.toLowerCase();
                    formMethods.setValue('name', lowercaseValue);

                    field.onChange(e);
                    setTextLength(e.target.value.length);
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
              <FormLabel
                htmlFor="color"
                className="font-semibold dark:font-normal dark:text-neutral-50/90"
              >
                Color
              </FormLabel>
              <FormControl>
                <RadioGroup
                  {...field}
                  value={field.value || ''}
                  onValueChange={(value) => field.onChange(value)}
                  className="flex flex-wrap justify-center gap-4 sm:justify-between"
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
                          'ring-2 ring-gray-600 ring-offset-2'
                        } h-10 w-10 cursor-pointer rounded-sm shadow-md ring-offset-2 focus:outline-none focus:ring-2 focus:ring-gray-500 sm:h-8 sm:w-8`}
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
          label={action.name === 'editCategory' ? 'Update' : 'Add'}
          isSubmitting={formMethods.formState.isSubmitting}
        />
      </form>
    </Form>
  );
}
