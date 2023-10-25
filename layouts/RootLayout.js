import AdsBaner from '@/components/Baners/AdsBaner'
import MainFooter from '@/components/Footer/MainFooter'
import Header from '@/components/Headers/Header'
import Navbar from '@/components/Headers/Navbar'
import BottomTabs from '@/components/common/BottomTabs'
import PdfViewer from '@/components/common/PdfViewer'
import SEO from '@/components/common/SEO'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { websiteSettings, get_article_breadcrumb } from '@/libs/api'
import MobileHead from '@/components/Headers//MobileHead';
import Title from '@/components/common/Title'
// import '@/styles/globals.scss

export default function RootLayout({ children, checkout, isLanding, head, homeAd, data, header_data,is_detail }) {
  // console.log(data.footer_content)
  const [breadCrumbs, setBreadCrumbs] = useState([]);
  const [headerData, setHeaderData] = useState([]);
  const [footerData, setFooterData] = useState([]);

  const router = useRouter();
  const styles = {
    display: 'flex',
    justifyContent: 'center'
  }

  useEffect(() => {
    if (typeof window != 'undefined' && router) {
      // console.log(router);
      if (router.query.detail) {
        article_breadcrumb(router.query.detail)
      } else setBreadCrumbs(router.asPath.split('/'))
    }

    let ads = document.getElementById('ads')
    get_website_settings() 
    // ads.classList.remove('hidden')
  }, [])

  const article_breadcrumb = async (route) => {
    const resp = await get_article_breadcrumb({ article_route: route })
    if (resp && resp.message && resp.message.length != 0) {
      // console.log(resp)
      // resp.message.map((res)=>{
      //   breadCrumbs.push(res)
      // })    
      setBreadCrumbs(resp.message)
    }
  }

  const get_website_settings = async () => {
    let websiteData = await websiteSettings()
    if (websiteData) {
      setHeaderData(websiteData.message.header_template)
      setFooterData(websiteData.message.footer_template)
    }
  }
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

  return (
    <>
      {/* <SEO /> */}
      {(!checkout || is_detail) && <div className="md:hidden lg:grid lg:justify-center"><AdsBaner homeAd={homeAd} style={styles} height={'h-full'} width={'500px'} /></div>}
      {/* <PdfViewer/> */}
      <>
        <Header checkout={checkout} />
        {/* {!checkout && <Navbar isLanding={isLanding} heading={head} /> } */}
        <Navbar isLanding={isLanding} heading={head} checkout={checkout} />
        {/* {!checkout ? <Navbar isLanding={isLanding} heading={head} /> : <div className='lg:hidden'><MobileHead isLanding={isLanding} Heading={head} /></div> } */}
        {(breadCrumbs && breadCrumbs.length > 1 && breadCrumbs[1] && breadCrumbs[1] != 'newsletters' && breadCrumbs[1].split('?')[0] != 'thankyou' && breadCrumbs[1].split('?')[0] != 'profile' && breadCrumbs[1].split('?')[0] != 'search' && breadCrumbs[1].split('?')[0] != 'tag') &&
          <div className='container flex  gap-[7px] md:hidden pt-[20px]'>
            {breadCrumbs.map((bc, index) => {
              let url = index == 3 ? '/' + breadCrumbs[1] + '/' + breadCrumbs[2] + '/' + breadCrumbs[3] :
                index == 2 ? '/' + breadCrumbs[1] + '/' + breadCrumbs[2] :
                  index == 1 ? router.query.detail ? '/categories/' + breadCrumbs[1] : '/' + breadCrumbs[1] : '/'
              return (<div key={index}  >
                {index == 0 ? <Link className={`flex gap-[5px] items-center capitalize hover:text-red `} href={url}>
                  <p className='text-[12px]'> Home</p>
                  <div className='ml-[5px] pt-[4px]'>
                    <Image alt='arrow' src={'/arrow.svg'} width={5} height={5} />
                  </div>
                </Link> : index == breadCrumbs.length - 1 ?
                  <div className={`flex gap-[5px] items-center capitalize hover:text-red `}>
                    <p className={`text-[12px] max-w-[250px] line-clamp-1 ${breadCrumbs.length - 1 == index && 'font-semibold'}`}> {bc.replaceAll('-', ' ')}</p>
                    {(index !== 0 && index != breadCrumbs.length - 1) &&
                      <div className='ml-[5px] pt-[4px]'>
                        <Image alt='arrow' src={'/arrow.svg'} width={5} height={5} />
                      </div>
                    }
                  </div> :
                  <Link className={`flex gap-[5px] items-center capitalize`} href={url}>
                    <p className={`text-[12px] ${breadCrumbs.length - 1 == index && 'font-semibold'}`}> {bc.replaceAll('-', ' ')}</p>
                    {(index !== 0 && index != breadCrumbs.length - 1) &&
                      <div className='ml-[5px] pt-[4px]'>
                        <Image alt='arrow' src={'/arrow.svg'} width={5} height={5} />
                      </div>
                    }
                  </Link>}
              </div>)
            })}
          </div>}
        <main id='main'>
          {children}
        </main>

        {(!checkout && !is_detail) && <div className="md:hidden mb-[10px] lg:grid lg:justify-center"><AdsBaner footerAd={homeAd} style={styles} height={'h-full'} width={'500px'} /></div>}
        {!checkout && <MainFooter footerData={footerData} />}
        {/* <div className='lg:hidden' >
          <BottomTabs />
        </div> */}
      </>
    </>
  )
}
