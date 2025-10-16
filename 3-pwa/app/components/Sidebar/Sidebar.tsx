import React from "react";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <div className={open ? `${styles.sidebar} ${styles.open}` : styles.sidebar}>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Закрыть сайдбар">
        ✖
      </button>
      <div className={styles.content}>
        <h3>Сайдбар</h3>
        <p>Здесь может быть ваш контент.</p>
      </div>
    </div>
  );
}