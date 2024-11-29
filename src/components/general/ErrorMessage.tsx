import { TriangleAlert } from 'lucide-react';

type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <main className="container mx-auto px-4 py-8 sm:py-4 h-screen max-w-5xl min-w-[360px]">
      <p className="text-red-500 font-semibold text-sm flex items-center justify-center gap-2">
        <TriangleAlert />
        Error loading data: {message}
      </p>
    </main>
  );
}
