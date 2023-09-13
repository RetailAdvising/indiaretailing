import AdsBaner from '@/components/Baners/AdsBaner'
import MainFooter from '@/components/Footer/MainFooter'
import Header from '@/components/Headers/Header'
import Navbar from '@/components/Headers/Navbar'
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
      <div>
      <Header checkout={checkout} />
      {!checkout && <Navbar isLanding={isLanding} heading={head} />}
      <main id='main'>{children}</main>
      <MainFooter />
      </div>
    </>
  )
}
  