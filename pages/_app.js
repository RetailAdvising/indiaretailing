import '@/styles/globals.scss'
import store from '../redux/store'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { Roboto } from 'next/font/google'
import setIsMobile from 'redux/actions/isMobileAction'
import { useDispatch, useSelector, Provider  } from 'react-redux'
// import userAction from 'redux/actions/userAction'

const inter = Roboto({
  weight: ["400"],
  display: "swap",
  preload: true,
  subsets: ["latin"]
})

export default function App({ Component, pageProps }) {


  // const userInfo = useSelector(s=>s.user);
  // const dispatch = useDispatch()

  useEffect(() => {
    // get_customer_info()
  },[])  

  // function get_customer_info(){
  //   let users = {}
  //   users.cust_email = localStorage['userid'] ? localStorage['userid'] : undefined;
  //   users.cust_name = localStorage['full_name'] ? localStorage['full_name'] : undefined;
  //   users.customer_id = localStorage['customer_id'] ? localStorage['customer_id'] : undefined;
  //   dispatch(userAction(users));
  // }

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
    <Provider store={store}>
      {/* { loading ? <p>loading...</p> */}
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </Provider>
  )
}
