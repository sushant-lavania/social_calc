import { Input } from "@/components/ui/input";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body className={inter.className}>
            <div>
                {children}
            </div>
        </body>
      </html>
    );
  }