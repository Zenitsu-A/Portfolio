import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({ 
  subsets: ["latin"], 
  variable: "--font-fraunces", // This matches your globals.css
  display: "swap",
});

const manrope = Manrope({ 
  subsets: ["latin"], 
  variable: "--font-manrope", // This matches your globals.css
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="bg-[#121212] text-white antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
