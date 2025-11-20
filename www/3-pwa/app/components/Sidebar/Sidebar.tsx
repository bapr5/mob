import React from "react";
import styles from "./Sidebar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Sidebar({ open, onClose, currentPage, onNavigate }: SidebarProps) {
  const pages = [
    { key: "home", label: "Главная" },
    { key: "about", label: "О приложении" },
    { key: "profile", label: "Профиль" },
    { key: "emojis", label: "Emojis" },
  ];

  return (
    <div className={open ? `${styles.sidebar} ${styles.open}` : styles.sidebar}>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Закрыть сайдбар">
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <nav className={styles.content}>
        <h3>Навигация</h3>
        <ul>
          {pages.map(page => (
            <li key={page.key}>
              <button
                className={currentPage === page.key ? styles.active : ""}
                onClick={() => onNavigate(page.key)}
              >
                {page.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}