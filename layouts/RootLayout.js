import AdsBaner from '@/components/Baners/AdsBaner'
import MainFooter from '@/components/Footer/MainFooter'
import Header from '@/components/Headers/Header'
import Navbar from '@/components/Headers/Navbar'
import SEO from '@/components/common/SEO'
import React from 'react'
// import '@/styles/globals.scss'

export default function RootLayout({children, checkout}) {
  const styles = {
    display:'flex',
    justifyContent:'center'
  }
  return (
    <>
    {/* <SEO /> */}
    {!checkout &&   <div className="md:hidden"><AdsBaner  data={{ad_image: "/audi_car.png"}} style={styles} height={'150px'} width={'500px'} /></div>}
    <Header checkout={checkout} />
    {!checkout &&  <Navbar />}
      <main >{children}</main>
    <MainFooter />
    </>
  )
}
