import Image from 'next/image'
import React, { useState } from 'react'
import SubscribeNews from '../Newsletter/SubscribeNews';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Nunito } from 'next/font/google'
const nunito = Nunito({
  weight: ["300", "400", "500", "600", "700"],
  display: "block",
  preload: true,
  style: 'normal',
  subsets: ["latin"],
  variable: '--font-inter',
})
export default function Subscribe({ data, height, width, isSubscribe }) {
  let [email, setEmail] = useState('')
  let [wrong, setWrong] = useState(false)
  async function showPopup() {
    console.log(email);
    // let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    // let val = email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    // console.log(val)
    if (emailValidation(email)) {
      show()
    } else {
      wrong = true
      setWrong(wrong)
    }
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

    // show();


  }

  const emailValidation = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
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


  const changingValue = (e) => {
    if (e.target.value && e.target.value != '') {
      email = e.target.value
      setEmail(email)

    } else {
      email = ''
      setEmail(email)
    }


    if (!emailValidation(email)) {
      wrong = true
      setWrong(wrong)
    } else {
      wrong = false
      setWrong(wrong)
    }
  }
  return (
    <>
      {/* <ToastContainer position={'bottom-right'} autoClose={2000} /> bg-[#fbfbfd] */}
      {/* h-[240px] */}
      <div className={`items-center h-[210px] gap-[10px] justify-center  rounded-[10px] border`} >
        {/* <div className={``}> */}
        {/* <p className={`absolute top-[35px] right-[120px] font-semibold text-[20px]`}>Subscribe</p>
          // <Image src={'/newsletter1.svg'} className={`${height} ${width}`} height={30} width={50} alt="" /> */}
        {/* <input placeholder="Your email address" onChange={(e) => setEmail(e.target.value)} className={`subscribe_input`} style={{ border: 'none' }} /> */}
        <div >
          {/* className='flex-[0_0_calc(30%_-_10px)]' */}
          {/* <Image src={'/Newsletter-subscription.svg'} className={` object-contain h-full w-full`} height={30} width={50} alt="" /> */}
          <Image src={'/Subscribe-01.svg'} className={` object-contain h-[100px] w-full`} height={30} width={50} alt="" />
        </div>
        <div className='flex-[0_0_calc(70%_-_10px)]'>
          <h5 className={`text-[17px] font-[700] text-center ${nunito.className}`}>Subscribe</h5>
          <p className={`text-[12px] font-[400] p-[5px_10px] text-center `}>Subscripe our newsletter and get notifications to stay update</p>
          <div className='relative w-full text-center px-[10px]'>
            <input placeholder="Your email address" className='rounded-full w-[85%] pl-[10px] h-[30px] text-[13px] !border-none bg-[#EFF4F4]' onChange={(e) => changingValue(e)} />
            <div className='absolute top-0 right-[30px]  w-[15%] rounded-full h-full'>
              {/* <Image src={'/send.svg'} onClick={showPopup} className='absolute top-[50%] left-[50%] cursor-pointer' style={{ transform: 'translate(-50%, -50%)' }} height={30} width={30} alt='send icon' /> */}
              <Image src={'/categories/send-01.svg'} onClick={showPopup} className='absolute top-[50%] left-[50%] cursor-pointer h-[25px] w-[25px] object-contain' style={{ transform: 'translate(-50%, -50%)' }} height={30} width={30} alt='send icon' />
            </div>
          </div>
          {wrong && <p className={`text-[#e21b22] font-semibold text-[12px]`}>Enter valid email</p>}
        </div>
        {/* </div> */}
        {/* <button className={`subscribe`} onClick={showPopup}>Subscribe</button> */}
      </div>

      {visible && <SubscribeNews email={email} data={data} visible={visible} hide={(obj) => hide(obj)} />}
    </>
  )
}
