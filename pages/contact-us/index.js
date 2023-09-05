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




export default function Contact() {
    return (
      <RootLayout>
        <About></About>
      </RootLayout>
    )
  }


