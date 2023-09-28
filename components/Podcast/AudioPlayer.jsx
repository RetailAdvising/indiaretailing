import Image from 'next/image';
import { check_Image } from '@/libs/common';
import React from 'react';

function AudioPlayer(data) {
  return (
    <div className="border p-[20px_30px] flex md:p-[10px] md:block">
      <div className="w-[30%] md:w-[100%]">
        <Image height={220} width={200} className={`md:pb-[5px] rounded-[5px] float-right pr-[65px] h-[220px] w-[80%] md:w-full md:object-contain md:h-[180px] md:pr-[5px]`} src={check_Image(data.data.image)} alt={"cards"} />
      </div>
      <div className="w-[70%] md:w-[100%] ">
        <h6 className="text-[32px] font-[600] pb-2 md:text-[18px] md:pt-[20px]">{data.data.title}</h6>
        <p>{data.data.category}</p>
        <p className={`p-[10px_0px]`} dangerouslySetInnerHTML={{ __html: data.data.description }}></p>
        <audio className="w-[100%] md:w-90" controls id="audio-element" src={check_Image(data.data.sound)}></audio>
      </div>
    </div>
  );
}

export default AudioPlayer;
