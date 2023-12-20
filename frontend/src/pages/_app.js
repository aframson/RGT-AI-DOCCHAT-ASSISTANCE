import '@/styles/globals.css'
import 'react-responsive-modal/styles.css';
import AppLayout from '@/Components/AppLayout';
export default function App({ Component, pageProps }) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}
