import type { Metadata } from "next";
import "@/app/(mainLayout)/globals.css";
import RQProvider from "./_component/RQProvider";

export const metadata: Metadata = {
  title: "전통주점",
  description: "전통주, 마침표를 찍다.",
};

type Props = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <RQProvider>
        <body>{children}</body>
      </RQProvider>
    </html>
  );
}
