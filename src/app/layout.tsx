import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { Filter } from "~/components/filter";

export const metadata: Metadata = {
  title: {
    default: "Rick and Morty",
    template: "%s | Rick and Morty",
  },
  description: "Informações dos personagens da série Rick and Morty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <header className="w-full">
          <section className="container mx-auto w-full flex items-center justify-center h-60 px-6">
            <h1>
              <Link href="/">
                <Image
                  src="/assets/images/logo.svg"
                  width={320}
                  height={200}
                  alt="Rick and Morty"
                />
              </Link>
            </h1>
          </section>
        </header>

        <main>
          <Filter />

          {children}
        </main>
      </body>
    </html>
  );
}
