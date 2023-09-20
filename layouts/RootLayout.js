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
// import '@/styles/globals.scss'
export default function RootLayout({ children, checkout, isLanding, head, homeAd, data }) {
  // console.log(data.footer_content)
  const [breadCrumbs, setBreadCrumbs] = useState([]);

  const router = useRouter();
  const styles = {
    display: 'flex',
    justifyContent: 'center'
  }
  useEffect(()=>{
    setBreadCrumbs(router.asPath.split('/'))
    let ads = document.getElementById('ads')
    // ads.classList.remove('hidden')
  },[])
    
  return (
    <>
      {/* <SEO /> */}
      {!checkout && <div className="md:hidden"><AdsBaner homeAd={homeAd} style={styles} height={'h-full'} width={'500px'} /></div>}
      {/* <PdfViewer/> */}
      <div>
      <Header checkout={checkout} />
      {!checkout && <Navbar isLanding={isLanding} heading={head} />}
      { (breadCrumbs && breadCrumbs.length > 1 && breadCrumbs[1] && breadCrumbs[1].split('?')[0] != 'profile' && breadCrumbs[1].split('?')[0] != 'search') &&
      <div className='container flex  gap-[7px] md:hidden py-[10px]'> 
          {breadCrumbs.map((bc,index)=>{
            let url = index == 3 ? '/'+breadCrumbs[1]+'/'+breadCrumbs[2]+'/'+breadCrumbs[3] :
                    index == 2 ? '/'+breadCrumbs[1]+'/'+breadCrumbs[2]:
                    index == 1 ? '/'+breadCrumbs[1]:'/'
            return(<>
              {index == 0 ? <Link key={index} className={`flex gap-[5px] items-center capitalize hover:text-red `} href={url}>
              <p className='text-[12px]'> Home</p> 
               <div className='ml-[5px] pt-[4px]'>
                 <Image alt='arrow' src={'/arrow.svg'} width={5} height={5}/>
               </div>
           </Link>: index == breadCrumbs.length -1  ?
            <div className={`flex gap-[5px] items-center capitalize hover:text-red `}>
                   <p className={`text-[12px] max-w-[250px] line-clamp-1 ${breadCrumbs.length-1 == index && 'font-semibold'}`}> {bc.replaceAll('-',' ')}</p> 
                    { (index !==0 && index != breadCrumbs.length-1) &&  
                    <div className='ml-[5px] pt-[4px]'>
                      <Image alt='arrow' src={'/arrow.svg'} width={5} height={5}/>
                    </div>
                    } 
             </div>:
               <Link className={`flex gap-[5px] items-center capitalize`} href={url}>
               <p className={`text-[12px] ${breadCrumbs.length-1 == index && 'font-semibold'}`}> {bc.replaceAll('-',' ')}</p> 
                { (index !==0 && index != breadCrumbs.length-1) &&  
                <div className='ml-[5px] pt-[4px]'>
                  <Image alt='arrow' src={'/arrow.svg'} width={5} height={5}/>
                </div>
                } 
         </Link>}
                </>)
          })}
                </div>
      }
     
      <main id='main'> 
        {children}
       </main>
       {!checkout && <div className="md:hidden mb-[10px]"><AdsBaner footerAd={homeAd} style={styles} height={'h-full'} width={'500px'} /></div>}
      {!checkout && <MainFooter /> }
      <div className='lg:hidden' >
      <BottomTabs />
      </div>
      </div>
    </>
  )
}
