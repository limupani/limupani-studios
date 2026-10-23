import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import ScrollToTop from './ScrollToTop'
import styles from './Layout.module.css'

/** Wraps every page: the page content on top, the footer always at the bottom. */
export default function Layout() {
  return (
    <div className={styles.layout}>
      <ScrollToTop />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
