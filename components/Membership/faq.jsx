import React, { useEffect, useState } from 'react';
import styles from '@/styles/Components.module.scss'
// import data from '@/libs/faq'



export default function Faq({data}) {
  // const [open, setOPen] = useState(false);

  const [seclected, setSelcted] = useState(-1)

  const toggle = (index) => {
    for (let i = 0; i < data.data.length; i++) {
      if (index == i) {
        setSelcted(i)
      }
    }
  }

  useEffect(()=>{

  },[seclected])

  return (
    <div className="flex flex-row pt-3.5 gap-6 md:flex-col">
      <div className="basis-1/2">
        <h2 className='font-bold text-3xl md:text-2xl'>{data.title}</h2>
      </div>
      <div className="basis-1/2">
        <div className='accordion'>
          {data.data.map((faq,index) => {
            return (
              <div key={index}>
                <h3  className='text-1xl font-bold pb-2 d__flex faq_title' onClick={() => toggle(index)}>{faq.question}<span>{(seclected == index) ? '-' : '+'}</span></h3>
                <p className={(seclected == index) ? 'content show' : 'content'}>{faq.answer}</p>
              </div>
            )
          })
          }
        </div>
      </div>
    </div>
  )
}

