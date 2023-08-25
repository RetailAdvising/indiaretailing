import '@/styles/globals.scss'
import store from '../redux/store'
import { Provider,useDispatch,useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useEffect,useState } from 'react';
import { Roboto } from 'next/font/google'


const inter = Roboto({
  weight: ["400"],
  display: "swap",
  preload: true,
  subsets: ["latin"]
})

export default function App({ Component, pageProps }) {
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
  return( 
    <Provider store={store}>
      {/* { loading ? <p>loading...</p> */}
         <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </Provider>
  )
}
