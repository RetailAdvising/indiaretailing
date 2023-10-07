import Image from 'next/image'
import React, { useState } from 'react'
import SubscribeNews from '../Newsletter/SubscribeNews';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Subscribe({ data, height, width, isSubscribe }) {
  const [email, setEmail] = useState('')
  async function showPopup() {
    // console.log(data);

    // let get_check = data.filter(res => { return res.selected == 1 })

    // if (get_check.length == data.length) {
    //   // setAlertMsg({ message: 'Already you have subscribed all the Newsletters' });
    //   // setEnableModal(true);
    // } else {
    //   data.map((res, i) => {
    //     // if (i == index) {
    //     //   res.selected = 1;
    //     // } else {
    //     //   res.selected = 0;
    //     // }
    //   })
    //   // setNews(obj);
    //   // setShowAlert(true);
    //   show();
    // }
    // console.log(email)
    show();


  }

  const [visible, setVisible] = useState(false)

  function show() {
    setVisible(true);
  }

  // const notify = () => toast("Newsletters subscribed successfully");

  function hide(obj) {
    setVisible(false);
    if (obj.status == 'Success') {
      // toast.success("Newsletters subscribed successfully");
      // notify();
      // setAlertMsg({message:''});
      // setEnableModal(true);
    }
  }
  return (
    <>
      {/* <ToastContainer position={'bottom-right'} autoClose={2000} /> bg-[#fbfbfd] */}
      {/* h-[240px] */}
      <div className={`flex items-center  justify-center flex-col rounded-[10px] border p-[10px]`} >
        <div className={``}>
          {/* <p className={`absolute top-[35px] right-[120px] font-semibold text-[20px]`}>Subscribe</p>
          // <Image src={'/newsletter1.svg'} className={`${height} ${width}`} height={30} width={50} alt="" /> */}
          {/* <input placeholder="Your email address" onChange={(e) => setEmail(e.target.value)} className={`subscribe_input`} style={{ border: 'none' }} /> */}
          <div className='flex items-center justify-between gap-[10px]'>
          <Image src={'/Newsletter-subscription.svg'} className={`${height} object-contain ${width}`} height={30} width={50} alt="" />
          <p className='text-[14px] font-semibold pb-[10px] text-center'>Subscribe our newsletter and get notifications to stay updated</p>
          </div>
          <div className='relative text-center'>
            <input placeholder="Your email address" className='rounded-full w-[70%] pl-[10px] h-[35px] text-[14px]' onChange={(e) => setEmail(e.target.value)} />
            <div className='absolute top-0 right-[45px] bg-red w-[17%] rounded-full h-full'>
              <Image src={'/send.svg'} className='absolute top-[50%] left-[50%]' style={{ transform: 'translate(-50%, -50%)' }} height={30} width={30} alt='send icon' />
            </div>
          </div>
        </div>
        {/* <button className={`subscribe`} onClick={showPopup}>Subscribe</button> */}
      </div>

      {visible && <SubscribeNews email={email} data={data} visible={visible} hide={(obj) => hide(obj)} />}
    </>
  )
}
