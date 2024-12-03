import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function FormHeader() {
  return (
    <CardHeader className="text-center">
      <CardTitle>Personal Task Manager</CardTitle>
      <CardDescription className="text-default">
        <p>Enter your email and password to log in</p>
        <p>or create a new account</p>
      </CardDescription>
    </CardHeader>
  );
}
