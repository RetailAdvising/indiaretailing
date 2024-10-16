import Image from 'next/image';
import { check_Image } from '@/libs/common';
import React from 'react';
// import { Nunito } from 'next/font/google'
import Dropdowns from '../common/Dropdowns';
// const nunito = Nunito({
//   weight: ["300", "400", "500", "600", "700"],
//   display: "block",
//   preload: true,
//   style: 'normal',
//   subsets: ["latin"],
//   variable: '--font-inter',
// })
function AudioPlayer(data) {
  const icons = [{ icon: "/bookstore/linkedin.svg", name: 'Linkedin' }, { icon: "/bookstore/FB.svg", name: 'Facebook' }, { icon: "/bookstore/twitter.svg", name: 'Twitter' }, { icon: "/bookstore/whatsapp.svg", name: 'Whatsapp' }]
  const updateShare = (val) => {

  }
  console.log(data,"data")
  return (
    <div className="border p-[20px_30px] flex md:p-[10px] gap-5 md:block">
      <div className="w-[30%] md:w-[100%]">
        <Image height={220} width={200} className={`md:pb-[5px] rounded-[5px]   h-[220px]  w-full md:object-contain md:h-[180px] md:pr-[5px]`} src={check_Image(data.data.image)} alt={"cards"} />
      </div>
      <div className="w-[70%] md:w-[100%] ">
        <div className='flex items-center gap-5 justify-between'>
          <h6 className={`text-[32px] font-[700] nunito pb-2 md:text-[18px] md:pt-[20px]`}>{data.data.title}</h6>
          {typeof window !== "undefined" && <div className='flex-[0_0_auto]'>
            {icons && <Dropdowns updateShare={updateShare} share={true} link={data.data} width={'w-[170px]'} data={icons} />}
          </div>}
        </div>
        <p className={`nunito font-semibold`}>{data.data.category}</p>
        <p className={`p-[10px_0px]`} dangerouslySetInnerHTML={{ __html: data.data.description }}></p>
        <audio className="w-[100%] md:w-90" controls id="audio-element" controlsList='nodownload noplaybackrate' src={check_Image(data.data.sound)}></audio>
      </div>
    </div>
  );
}

export default AudioPlayer;
