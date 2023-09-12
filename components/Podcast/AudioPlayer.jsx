import { useState } from 'react';
import Image from 'next/image';
import { check_Image } from '@/libs/common';
import React from 'react';

function AudioPlayer(data) {
  return (
    <div className="border p-[20px_30px] flex md:p-[10px]">
      <div className="w-[30%]">
        <Image height={220} width={200} className={`rounded-[5px] float-right pr-[10px] h-[220px] w-[65%] md:w-[100%] md:h-[130px] md:pr-[5px]`} src={check_Image(data.data.image)} alt={"cards"} />
      </div>
      <div className="w-[70%]">
        <h6 className="text-[32px] font-[100] pb-2 md:text-[18px]">{data.data.title}</h6>
        <p>{data.data.category}</p>
        <p className={`p-[10px_0px]`} dangerouslySetInnerHTML={{ __html: data.data.description }}></p>
        <audio className="w-[100%] md:w-90" controls id="audio-element" src={check_Image(data.data.sound)}></audio>
      </div>
    </div>
  );
}

export default AudioPlayer;
