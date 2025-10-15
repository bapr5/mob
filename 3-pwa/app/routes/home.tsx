import type { Route } from "./+types/home";
import { useState } from "react";

import classes from "./home.module.css"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false)

  const minSwipeDistance = 50

  const onTouchStart = (e: any) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe || isRightSwipe) console.log('swipe', isLeftSwipe ? setSideBarOpen(false) : setSideBarOpen(true))
  }

  return (
    <div className={classes.home} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
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
      <span><div className={sideBarOpen ? `${classes.sidebar} ${classes.open}` : classes.sidebar}></div>
        <div style={{ padding: '20px' }}>
          <h2>Главная страница</h2>
          <p>Свайпните вправо, чтобы открыть сайдбар, влево — чтобы закрыть.</p>
          <div>Состояние: {sideBarOpen ? "Открыт" : "Закрыт"}</div>
        </div>
      </span>
    </div>
  );

}
