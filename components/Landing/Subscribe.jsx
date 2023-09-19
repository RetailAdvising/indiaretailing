import Image from 'next/image'
import React, { useState } from 'react'
import SubscribeNews from '../Newsletter/SubscribeNews';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Subscribe({ data, height, width }) {
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
    console.log(email)
    show();


  }

  const [visible, setVisible] = useState(false)

  function show() {
    setVisible(true);
  }

  const notify = () => toast("Newsletters subscribed successfully");

  function hide(obj) {
    setVisible(false);
    if (obj.status == 'Success') {
      notify();
      // setAlertMsg({message:''});
      // setEnableModal(true);
    }
  }
  return (
    <>
      <ToastContainer position="top-right" />
      <div className={`flex items-center h-[180px] justify-center flex-col rounded bg-[#fbfbfd]`} >
        <div className={`relative`}>
          <p className={`absolute top-[35px] right-[120px] font-semibold text-[20px]`}>Subscribe</p>
          <Image src={'/newsletter1.svg'} className={`${height} ${width}`} height={30} width={50} alt="" />
          <input placeholder="Your email address" onChange={(e) => setEmail(e.target.value)} className={`subscribe_input`} style={{ border: 'none' }} />
        </div>
        <button className={`subscribe`} onClick={showPopup}>Subscribe</button>
      </div>

      {visible && <SubscribeNews email={email} data={data} visible={visible} hide={(obj) => hide(obj)} />}
    </>
  )
}
