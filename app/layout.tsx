import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import AuthContext from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/Sonner';
import { ExitModal } from '@/components/modals/ExitModal';
import { HeartsModal } from '@/components/modals/HeartsModal';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chordfy',
  description: 'Learn Music!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/icons/logo.png" type="image/x-icon" />
      <AuthContext>
        <Toaster />
        <ExitModal />
        <HeartsModal />
        <body className={font.className}>{children}</body>
      </AuthContext>
    </html>
  );
}
