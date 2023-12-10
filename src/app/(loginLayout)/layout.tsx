import { ReactNode } from "react";
import styles from '@/app/page.module.css';

export default function LoginLayout({ children, modal }: { children: ReactNode, modal: ReactNode }) {
    return (
        <div className={styles.container}>
            LOGIN LAYOUT
            {children}
            {modal}
        </div>
    )
}