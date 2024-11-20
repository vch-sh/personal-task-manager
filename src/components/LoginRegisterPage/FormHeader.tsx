import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function FormHeader() {
  return (
    <CardHeader className="text-center">
      <CardTitle>Personal Task Manager</CardTitle>
      <CardDescription className="text-default">
        Enter your email below to login or create your account
      </CardDescription>
    </CardHeader>
  );
}
