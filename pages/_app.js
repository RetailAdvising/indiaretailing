'use client'
import '@/styles/globals.scss'
import store from '../redux/store'
import { Inter, Roboto, Faustina } from 'next/font/google'
import { useDispatch, useSelector, Provider } from 'react-redux'
// import userAction from 'redux/actions/userAction'
import ErrorBoundary from '@/components/Exception/ErrorBoundary'
import { useEffect, useState, useMemo } from 'react'
import Head from 'next/head'
import { websiteSettings } from '@/libs/api'
import MobileHead from '@/components/Headers/MobileHead'
import BottomTabs from '@/components/common/BottomTabs'
import Header from '@/components/Headers/Header'
import { ChakraProvider } from '@chakra-ui/react'
import nProgress from "nprogress";
import { Router, useRouter } from "next/router";
import "nprogress/nprogress.css"
import { SessionProvider } from "next-auth/react"
// import Loader from '@/components/Loader'
// const inter = Inter({
//   weight: ["200", "300", "400", "500", "600", '700'],
//   display: "block",
//   preload: true,
//   style: 'normal',
//   subsets: ["latin"],
//   variable: '--font-inter'
// })

const inter = Faustina({
  weight: ["300", "400", "500", "600", '700'],
  display: "block",
  preload: true,
  style: 'normal',
  subsets: ["latin"],
  variable: '--font-faustina'
})


export default function App({ Component, pageProps }) {
  const [tabHeight, setTabHeight] = useState(0)
  const [activeTab, setActiveTab] = useState(0)

  const router = useRouter()

  useEffect(() => {
    let tabs = document.getElementById('tabs')
    setTabHeight(tabs && tabs.clientHeight)
    get_website_settings()

    // const handleBackButton = (event) => {
    //   if (event.type === 'popstate') {
    //     const historyState = event.state;
    //     // console.log(historyState,'historyState')
    //     if (historyState && historyState.hrefStack && historyState.hrefStack.length > 0) {
    //       const previousHrefs = historyState.hrefStack;
    //       // Perform any necessary action with the previous hrefs
    //       // console.log(previousHrefs,'previousHrefs');
    //     }
    //   }
    //   // console.log(window.location,'window.location')
    // }

    // window.addEventListener('popstate', handleBackButton);

    // return () => {
    //   window.removeEventListener('popstate', handleBackButton);
    // };
  }, [])



  const get_website_settings = async () => {
    let websiteData = await websiteSettings()
    if (websiteData) {
      pageProps["headerData"] = websiteData.message.header_template
      pageProps["footerData"] = websiteData.message.footer_template
    }
  }

  const getActiveTab = (tab_data) => {
    // console.log(tab_data);
    setActiveTab(tab_data)
  }

  useEffect(() => {
    // NProgress.configure({ showSpinner: false });
    nProgress.configure({ showSpinner: false })
    const handleStart = () => {
      nProgress.start()
    };
    const handleComplete = () => {
      nProgress.done()
    };

    if (!router.query.detail) {
      router.events.on("routeChangeStart", handleStart);
      router.events.on("routeChangeComplete", handleComplete);
      router.events.on("routeChangeError", handleComplete);

      return () => {
        router.events.off("routeChangeStart", handleStart);
        router.events.off("routeChangeComplete", handleComplete);
        router.events.off("routeChangeError", handleComplete);
      };
    }
  }, [router])

  // const getRoutes = (route) => {
  //   console.log(route,'actives route')
  //   const val = {redirect_url: router.route}
  //   setActiveTab(val)
  // }

  // let tabsAct = useMemo(()=> getRoutes(router), [router]) 



  // const router = useRouter();
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const handleStart = () => {
  //     setLoading(true);
  //   };
  //   const handleComplete = () => {
  //     setLoading(false);
  //   };

  //   console.log(router)
  //   if(!router.query.detail){
  //     router.events.on("routeChangeStart", handleStart);
  //     router.events.on("routeChangeComplete", handleComplete);
  //     router.events.on("routeChangeError", handleComplete);

  //     return () => {
  //       router.events.off("routeChangeStart", handleStart);
  //       router.events.off("routeChangeComplete", handleComplete);
  //       router.events.off("routeChangeError", handleComplete);
  //     };
  //   }
  // }, [router]);

  // const isMobile = useSelector(s=> s.isMobile)
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   checkIsMobile();
  //   window.addEventListener('resize', checkIsMobile)
  //   return () => {
  //     window.removeEventListener('resize', checkIsMobile);
  //   };
  // }, [])

  // const checkIsMobile = async () => {
  //   let isMobile = await checkMobile();
  //   // setIsmobile(isMobile);
  //   dispatch(setIsMobile(isMobile))
  //   console.log('isMobile', isMobile)
  // }
  return (
    <>
      <Head>
        {/* <link href="https://indiaretailing.go1cms/files/default-theme.css" rel="stylesheet"/> */}

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.6.12/css/lightgallery.min.css"
        />
        <script src="https://apis.google.com/js/api.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/lightgallery@1.6.12/dist/js/lightgallery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/lg-thumbnail/1.1.0/lg-thumbnail.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/lg-fullscreen/1.1.0/lg-fullscreen.min.js"></script>

      </Head>
      <ErrorBoundary >
        <Provider store={store} >
          {/* { loading ? <p>loading...</p> calc(100vh_-_${tabHeight}px) */}
          <ChakraProvider>
            <SessionProvider>
              <main className={` ${inter.className} md:max-h-[100vh] md:overflow-auto`} id='scroll_div' >
                <div className='lg:hidden'><MobileHead getActiveTab={getActiveTab} activeTab={activeTab} /></div>
                {/* <Header/> */}
                <Component {...pageProps} />
                <div className='lg:hidden'>
                  <BottomTabs getActiveTab={getActiveTab} activeTab={activeTab} />
                </div>
              </main>
            </SessionProvider>
          </ChakraProvider>
        </Provider>
      </ErrorBoundary>
    </>
  )
}
