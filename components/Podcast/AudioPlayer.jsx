import { useState } from 'react';
import Image from 'next/image';

function AudioPlayer() {
  //   const [isPlaying, setIsPlaying] = useState(false);
  const audioSrc = '/podcast/fast.mp3'; // Replace with the path to your audio file
  const image= '/podcast/card1.png';
  //   const toggleAudio = () => {
  //     const audioElement = document.getElementById('audio-element');

  //     if (isPlaying) {
  //       audioElement.pause();
  //     } else {
  //       audioElement.play();
  //     }

  //     setIsPlaying(!isPlaying);
  //   };

  return (
    <div className="border p-[20px_30px] flex">
      <div className="w-[40%]">
        <Image height={220} width={200} className={`rounded-[5px] float-right pr-10 h-[220px] w-[60%]`} src={image}  alt={"cards"} />
      </div>
      <div className="w-[60%]">
        <h6 className="text-base">Modern retail Podcast</h6>
        <p>by Vishen</p>
        <p>Lorem ipsum dolor sit amet consectetur. Pretium massa adipiscing magna aliquam senectus. Maecenas rhoncus suspendisse ante et nunc velit. Sed amet sed vitae facilisi.</p>
        <audio controls id="audio-element" src={audioSrc}></audio>
      </div>
    </div>
  );
}

export default AudioPlayer;
