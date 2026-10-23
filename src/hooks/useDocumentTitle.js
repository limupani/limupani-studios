import { useEffect } from 'react'
import { site } from '../config/site'

/** Sets the browser tab title. No argument = just the site name. */
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : site.name
  }, [title])
}
