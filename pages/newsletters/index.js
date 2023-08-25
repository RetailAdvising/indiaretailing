// import NewsLetterBuilder from '@/components/Builders/NewsLetterBuilder'
import RootLayout from '@/layouts/RootLayout'
import React from 'react'
import NewsList from '@/components/Newsletter/NewsList';
import value from '@/libs/newsletter';
import Title from '@/components/common/Title';
import AdsBaner from '@/components/Baners/AdsBaner';
import Subscribe from '@/components/Landing/Subscribe';
import { newsLanding } from '@/libs/api';

export default function newsletter({ data }) {

  return (
    <>
      <RootLayout>
        {(data) && <div className='container p-[30px]'>
          <div className='text-center'><Title data={{title:'Newsletters'}} /></div>
          <div className=' flex justify-between gap-[20px]'>
            <div className={`flex-[0_0_calc(70%_-_10px)] border p-[20px] rounded-[5px]`}>
              <NewsList data={data} />
            </div>

            {value.col_2 &&
              <div className='flex-[0_0_calc(30%_-_10px)]'>
                <div className='pb-[20px]'>
                  <AdsBaner data={value.col_2} />
                </div>
                <div>
                  <Subscribe height={'h-[162px]'} width={'w-full'} data={value.col_2.data} />
                </div>
              </div>
            }

          </div>


        </div>}

      </RootLayout>
    </>
  )
}


export async function getStaticProps() {
  let param = {
    fields: ['custom_day', 'name', 'custom_category', 'custom_description', 'custom_image_', 'custom_title', 'route']
  }
  let value = await newsLanding(param);
  let data = value.message;

  return {
    props: { data }, revalidate: 50,
  }
}

// export async function getServerSideProps() {
//   let param = {
//     fields: ['custom_day', 'name', 'custom_category', 'custom_description', 'custom_image_', 'custom_title', 'route']
//   }
//   let value = await newsLanding(param);
//   let data = value.message;

//   return {
//     props: { data }
//   }
// }