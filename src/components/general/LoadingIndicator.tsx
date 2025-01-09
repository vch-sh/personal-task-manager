'use client';

import { AppProgressBar } from 'next-nprogress-bar';

type LoadingIndicatorProps = { darkMode: boolean };

export default function LoadingIndicator({ darkMode }: LoadingIndicatorProps) {
  const color = darkMode ? '#12ae8f' : '#0a2fff';

  return <AppProgressBar color={color} options={{ showSpinner: false }} />;
}
