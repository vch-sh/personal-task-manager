import Link from 'next/link';
import { CardFooter } from '@/components/ui/card';

export default function CardFooterContent() {
  return (
    <p className="text-sm text-center text-gray-700 w-full">
      By clicking continue, you agree to our{' '}
      <Link
        href="/terms"
        className="underline underline-offset-4 cursor-not-allowed"
      >
        Terms of Service
      </Link>{' '}
      and{' '}
      <Link
        href="/privacy"
        className="underline underline-offset-4 cursor-not-allowed"
      >
        Privacy Policy
      </Link>
      .
    </p>
  );
}
