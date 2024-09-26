import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";

const inter = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Support App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (


    <html lang="en" suppressHydrationWarning className="antialiased">
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class">
            {children}

          </ThemeProvider>
          <ToastContainer stacked />
        </Providers>
      </body>

    </html>
  );
}