import React from "react";
import ImageLoader from "../ImageLoader";
import Form from '@/components/Webinar/Form'
import styles from '@/styles/Cards.module.scss'

const Video = ({ data }) => {
  return (
    <>
      <div className="flex mt-5 no_scroll lg:space-x-4">
        {data.map((res, i) => (
          <div key={i} className="min-w-[310px]">
            <div className={`${styles.img_div}`}>
            <ImageLoader src={res.image}  style={`h-[170px] w-full rounded-lg ${styles.card_img}`} alt="" />
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

export default Video;
