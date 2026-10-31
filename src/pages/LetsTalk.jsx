import { images } from '../assets/images'
import DesignCanvas from '../components/DesignCanvas/DesignCanvas'
import TopBar from '../components/TopBar/TopBar'
import { contact } from '../config/contact'
import { pages } from '../config/pages'
import useDocumentTitle from '../hooks/useDocumentTitle'
import styles from './LetsTalk.module.css'

export default function LetsTalk() {
  useDocumentTitle(pages.letsTalk.title)

  return (
    <DesignCanvas>
      <div className={styles.page}>
        <TopBar showCart={false} />

        <img src={images.buttons.letsTalk} alt="Let's talk" className={styles.icon} draggable={false} />

        <h1 className={styles.heading}>{contact.heading}</h1>
        <p className={styles.intro}>{contact.intro}</p>

        <ul className={styles.links}>
          {contact.links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.text}</a>
            </li>
          ))}
        </ul>
      </div>
    </DesignCanvas>
  )
}