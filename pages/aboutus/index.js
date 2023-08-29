import React from 'react';
import RootLayout from '@/layouts/RootLayout';
import Image from 'next/image';
import { Value } from 'sass';
import Values from '@/components/Aboutus/values';
import Publications from '@/components/Aboutus/publications';
import Exhibitions from '@/components/Aboutus/exhibitions';
import Events from '@/components/Aboutus/events';
import About from '@/components/Aboutus/about';



export default function Aboutus() {
    return (
      <RootLayout>
        <div className='container md:p-[15px]'>
            <About></About>
        </div>
        <div className='container md:p-[15px]'>
            <Values></Values>
        </div>
        <div className='container md:p-[15px]'>
            <Publications></Publications>
        </div>
        <div className='container md:p-[15px]'>
            <Events></Events>
        </div>
        <div className='container md:p-[15px]'>
            <Exhibitions></Exhibitions>
        </div>
       
      </RootLayout>
    )
  }


