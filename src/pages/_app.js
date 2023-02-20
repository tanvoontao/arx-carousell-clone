import '@/styles/globals.css'
import "@/styles/nprogress.css";

import Providers from '@/components/Providers/Providers'
import { useEffect } from 'react'
import { Router } from 'next/router'
import NProgress from "nprogress";

import Aos from "aos";
import 'aos/dist/aos.css';

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeError', () => {
  NProgress.done()
})
Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})

export default function App({ Component, pageProps, emotionCache }) {

  useEffect(() => {
    Aos.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
      delay: 0,
      duration: 400,
    });
  }, []);

  // useEffect(() => {
  //   AOS.refresh()
  // }, [])

  return (
    <>
      <Providers emotionCache={emotionCache}>

        <Component {...pageProps} />
      </Providers>
    </>
  )
}
