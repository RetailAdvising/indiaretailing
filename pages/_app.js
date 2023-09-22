import '@/styles/globals.scss'
import store from '../redux/store'
import { Inter,Roboto } from 'next/font/google'
import { useDispatch, useSelector, Provider } from 'react-redux'
// import userAction from 'redux/actions/userAction'
import ErrorBoundary from '@/components/Exception/ErrorBoundary'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { websiteSettings } from '@/libs/api'
import MobileHead from '@/components/Headers/MobileHead'
import BottomTabs from '@/components/common/BottomTabs'
const inter = Inter({
  weight: ["200","300","400","500","600",'700'],
  display: "block",
  preload: true,
  style: 'normal',
  subsets: ["latin"],
  variable:'--font-inter'
})


export default function App({ Component, pageProps }) {
const [tabHeight,setTabHeight] = useState(0)
const [activeTab,setActiveTab] = useState(0)
  useEffect(() => {
    let tabs = document.getElementById('tabs')
    setTabHeight(tabs && tabs.clientHeight)
    get_website_settings()
  },[])

  const get_website_settings = async () => {
    let websiteData = await websiteSettings()
    if (websiteData) {
      pageProps["headerData"] = websiteData.message.header_template 
      pageProps["footerData"] = websiteData.message.footer_template 
    }
  }

  const getActiveTab = (tab_data) =>{
    console.log(tab_data);
    setActiveTab(tab_data)

  }
  // const router = useRouter();
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const handleStart = () => {
  //     setLoading(true);
  //   };
  //   const handleComplete = () => {
  //     setLoading(false);
  //   };

  //   router.events.on("routeChangeStart", handleStart);
  //   router.events.on("routeChangeComplete", handleComplete);
  //   router.events.on("routeChangeError", handleComplete);

  //   return () => {
  //     router.events.off("routeChangeStart", handleStart);
  //     router.events.off("routeChangeComplete", handleComplete);
  //     router.events.off("routeChangeError", handleComplete);
  //   };
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
       </Head>
      <ErrorBoundary > 
        <Provider store={store} >
          {/* { loading ? <p>loading...</p> calc(100vh_-_${tabHeight}px) */}
          <main className={` ${inter.className} md:max-h-[100vh] md:overflow-auto`} id='scroll_div' >
          <div className='lg:hidden'><MobileHead getActiveTab = {getActiveTab} activeTab={activeTab}/></div>
            <Component {...pageProps} />
            <div className='lg:hidden'>
            <BottomTabs getActiveTab={getActiveTab} activeTab={activeTab}/>
           </div>
          </main>
        </Provider>
      </ErrorBoundary>
    </>
  )
}
