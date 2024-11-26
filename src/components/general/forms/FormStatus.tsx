import FormError from './FormError';
import FormSuccess from './FormSuccess';

type FormStatusProps = {
  status: { error?: string; success?: string };
};

export default function FormStatus({ status }: FormStatusProps) {
  if (status.error) {
    return <FormError error={status.error} />;
  }

  if (status.success) {
    return <FormSuccess success={status.success} />;
  }

  return null;
}
