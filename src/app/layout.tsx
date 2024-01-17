import type { Metadata } from "next";
import styles from "@/app/page.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "전통주점",
  description: "전통주, 마침표를 찍다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <div className={styles.container} suppressHydrationWarning={true}>
          {children}
        </div>
        <ToastContainer limit={1} />
      </body>
    </html>
  );
}
