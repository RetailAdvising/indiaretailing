import React from "react";
import ImageLoader from "../ImageLoader";
import styles from '@/styles/Cards.module.scss'


const WhitePaper = ({ data, click_data }) => {
  console.log('wp', data);
  
  return (
    <>
      <div className="flex mt-5 no_scroll lg:gap-4">
        {data.map((res, i) => (
           <div key={i} className="min-w-[310px] rounded-lg border p-3 cursor-pointer" onClick={()=> click_data(res)}>
           <div className={`${styles.img_div}`}>
           <ImageLoader src={res.image}  style={`h-[187px] object-cover w-full rounded-lg ${styles.card_img}`} alt="" />
           </div>
           <div className="">
           {res.title && <h4 className={`card-title line-clamp-2 lg:min-h-[40px] pt-2`}>{res.title ? res.title : ''}</h4>}
           </div>
         </div>
        ))}
      </div>
    </>
  );
};

export default WhitePaper;
