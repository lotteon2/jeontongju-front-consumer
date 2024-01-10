import type { Metadata } from "next";
import { Jua } from "next/font/google";
import styles from "@/app/page.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const jua = Jua({ subsets: ["latin"], display: "swap", weight: "400" });

export const metadata: Metadata = {
  title: "전통주점",
  description: "전통주, 마침표를 찍다.",
  themeColor: "#ffa1a1",
  manifest: "../../public/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={jua.className}>
        <div className={styles.container} suppressHydrationWarning={true}>
          {children}
        </div>
        <ToastContainer limit={1} />
      </body>
    </html>
  );
}
