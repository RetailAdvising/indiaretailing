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




export default function Advertise() {
    return (
      <RootLayout>
        <div className='container py-8 md:p-[15px]'>
        <h2>Advertise with us</h2>
        <p>Showcase your product / solution to digitally savvy decision makers from Retail, eCommerce, D2C, Fashion, Food, shopping centres and grow exponentially.</p>
        </div>
        
      </RootLayout>
    )
  }


