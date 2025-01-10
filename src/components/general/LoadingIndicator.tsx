'use client';

import { AppProgressBar } from 'next-nprogress-bar';

export default function LoadingIndicator() {
  return <AppProgressBar color="#89cff0" options={{ showSpinner: false }} />;
}
