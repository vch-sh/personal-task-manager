import { PropsWithChildren } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SettingsPageContent({ children }: PropsWithChildren) {
  return (
    <Card className="mt-4">
      <CardTitle></CardTitle>
      <CardHeader className="text-center">
        <CardTitle></CardTitle>
        <CardDescription className="sm:text-left">
          Application Settings
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
