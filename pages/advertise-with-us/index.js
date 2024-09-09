import React from 'react';
import RootLayout from '@/layouts/RootLayout';
import Image from 'next/image';
import { Value } from 'sass';
import Values from '@/components/Aboutus/values';
import Publications from '@/components/Aboutus/publications';
import Exhibitions from '@/components/Aboutus/exhibitions';
import Events from '@/components/Aboutus/events';
import About from '@/components/Aboutus/about';
import Books from '@/components/Aboutus/books';
import SEO from '@/components/common/SEO';




export default function Advertise() {
  return (
    <RootLayout adIdH={'advertise-head'} adIdF={'advertise-foot'}>
       <SEO title={'India Reatiling Advertise with Us.'} siteName={'India Reatiling'} description={'This is IndiaRetailing and its about news and articles based on the popular site.'} />
          <div className={`footer`}>
              <div className='container gap-11 py-10 md:p-[15px] max-w-full'>
                <div className={`flex-[0_0_calc(25%_-_10px)] md:flex-[0_0_calc(100%_-_10px)] flex flex-row gap-1.5 md:flex-col`}>
                  <div className="basis-2/4">
                  <h2 className='font-bold text-3xl md:text-2xl pt-6 md:pt-0 text-left md:text-left mb-2'>Advertise with us</h2>
                  <p className='address font-normal'>Showcase your product / solution to digitally savvy decision makers from Retail, eCommerce, D2C, Fashion, Food, shopping centres and grow exponentially.</p>
                  <p className='address font-normal'>We have various ways to promote your brand and to know how, please get in touch with Bhavesh Pitroda email : bhaveshpitroda@imagesgroup.in</p>
                  </div>
                  <div className="basis-2/4">
                      <Image src="/advertise_with_us_02.svg" alt="About" width={500} height={500} className='m-auto'/>
                  </div>
                </div>
              </div>
          </div>
    </RootLayout>
  )
  }


