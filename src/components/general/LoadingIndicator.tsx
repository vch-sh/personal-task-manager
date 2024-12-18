'use client';

import { AppProgressBar } from 'next-nprogress-bar';

export default function LoadingIndicator() {
  return <AppProgressBar options={{ showSpinner: false }} />;
}
