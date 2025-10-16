import type { Route } from "./+types/home";
import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import classes from "./home.module.css";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>("home");

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) setSideBarOpen(false);
    if (isRightSwipe) setSideBarOpen(true);
  };

  let pageContent;
  switch (currentPage) {
    case "about":
      pageContent = (
        <>
          <h2>О приложении</h2>
          <p>Это простое PWA-приложение на React.</p>
        </>
      );
      break;
    case "profile":
      pageContent = (
        <>
          <h2>Профиль</h2>
          <p>Здесь будет информация о пользователе.</p>
        </>
      );
      break;
    default:
      pageContent = (
        <>
          <h2>Главная страница</h2>
          <p>Свайпните вправо, чтобы открыть сайдбар, влево — чтобы закрыть.</p>
          <div>Состояние: {sideBarOpen ? "Открыт" : "Закрыт"}</div>
        </>
      );
  }

  return (
    <div
      className={classes.home}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Sidebar
        open={sideBarOpen}
        onClose={() => setSideBarOpen(false)}
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          setSideBarOpen(false);
        }}
      />
      <header className={classes.header}>
        <button
          className={classes['arrow-btn']}
          onClick={() => setSideBarOpen(!sideBarOpen)}
          aria-label={sideBarOpen ? 'Закрыть сайдбар' : 'Открыть сайдбар'}
        >
          <span
            className={sideBarOpen ? `${classes['arrow-icon']} ${classes['open']}` : classes['arrow-icon']}
            aria-hidden="true"
          >
            ➡️
          </span>
        </button>
        <span className={classes['header-logo']}>mob</span>
        <span style={{ verticalAlign: 'middle' }}>Приложение</span>
      </header>
      <div style={{ padding: '20px' }}>
        {pageContent}
      </div>
    </div>
  );
}
