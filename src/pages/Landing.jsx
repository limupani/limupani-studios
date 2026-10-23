import Scene from '../components/Scene/Scene'
import { landing } from '../config/landing'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function Landing() {
  useDocumentTitle()
  return <Scene {...landing} />
}
