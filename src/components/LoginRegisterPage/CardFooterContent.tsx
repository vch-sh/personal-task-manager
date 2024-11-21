import Link from 'next/link';

export default function CardFooterContent() {
  return (
    <p className="text-sm text-center text-default w-full">
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
