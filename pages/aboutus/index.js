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
        <div className='container p-[30px]'>
            <About></About>
        </div>
        <div className='container p-[30px]'>
            <Values></Values>
        </div>
        <div className='container p-[30px]'>
            <Publications></Publications>
        </div>
        <div className='container p-[30px]'>
            <Events></Events>
        </div>
        <div className='container p-[30px]'>
            <Exhibitions></Exhibitions>
        </div>
       
      </RootLayout>
    )
  }


