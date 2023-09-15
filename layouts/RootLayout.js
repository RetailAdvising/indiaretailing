import AdsBaner from '@/components/Baners/AdsBaner'
import MainFooter from '@/components/Footer/MainFooter'
import Header from '@/components/Headers/Header'
import Navbar from '@/components/Headers/Navbar'
import BottomTabs from '@/components/common/BottomTabs'
import PdfViewer from '@/components/common/PdfViewer'
import SEO from '@/components/common/SEO'
import React from 'react'
// import '@/styles/globals.scss'
export default function RootLayout({ children, checkout, isLanding, head, homeAd, data }) {
  // console.log(data.footer_content)
  
  const styles = {
    display: 'flex',
    justifyContent: 'center'
  }
  return (
    <>
      {/* <SEO /> */}
      {!checkout && <div className="md:hidden"><AdsBaner homeAd={homeAd} style={styles} height={'h-full'} width={'500px'} /></div>}
      {/* <PdfViewer/> */}
      <div>
      <Header checkout={checkout} />
      {!checkout && <Navbar isLanding={isLanding} heading={head} />}
      <main id='main' style={{minHeight:'650px'}}>
        {children}
        </main>
      {!checkout && <MainFooter /> }
      <div className='lg:hidden' >
      <BottomTabs />
      </div>
      </div>
    </>
  )
}
