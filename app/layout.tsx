import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import AuthContext from '@/contexts/AuthContext';

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
      <link rel="shortcut icon" href="logo.png" type="image/x-icon" />
      <AuthContext>
        <body className={font.className}>{children}</body>
      </AuthContext>
    </html>
  );
}
