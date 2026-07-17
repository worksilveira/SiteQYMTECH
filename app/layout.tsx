import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'QYM Tech | Plataforma de Legislação Municipal & GovTech',
  description: 'Gestão, compilação e publicação da legislação municipal de forma profissional e moderna. Tecnologia de alta performance para Câmaras Municipais e Governos Municipais.',
  openGraph: {
    title: 'QYM Tech | Plataforma de Legislação Municipal',
    description: 'Solução premium de compilação técnica, digitalização e publicação da legislação municipal para prefeituras e câmaras de vereadores.',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://qymtech.com.br',
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#F7F8FA] text-[#1A1A2E] antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
