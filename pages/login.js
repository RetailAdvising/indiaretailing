import LogIn from '@/components/Auth/LogIn'
import SignUp from '@/components/Auth/SignUp'
import Adsense from '@/components/Baners/Adsense'
import Modal from '@/components/common/Modal'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function login() {
  const [shows,setShows] = useState(false);
    const route = useRouter()
  
  useEffect(()=>{
    if(localStorage["apikey"]){
      // console.log("l");
      route.push("/")
    }
  },[shows])
  return (
    <>
    <Adsense adSlot="/21631575671/New-IndiaRetailing-Home-Top-728x90" adClient="ca-pub-9354161551837950" adStyle={{ display: "inline-block", width: "728px", height: "90px" }} />
     <LogIn show={shows} goPass={()=> setShows(!shows)} /> 
     <Adsense adSlot="/21631575671/New-IndiaRetailing-Home-300x250" adClient="ca-pub-9354161551837950" adStyle={{ display: "inline-block", width: "300px", height: "250px" }} />
     <Adsense adSlot="/21631575671/New-IndiaRetailing-Home-Top-728x90" adClient="ca-pub-9354161551837950" adStyle={{ display: "inline-block", width: "728px", height: "90px" }} />
     <Adsense adSlot="/21631575671/New-IndiaRetailing-Home-300x250" adClient="ca-pub-9354161551837950" adStyle={{ display: "inline-block", width: "300px", height: "250px" }} />
      {/* <button onClick={()=> setShow(!show)}>modal popup</button>

      <div className={`${show ? 'modalActive' : 'modalContainer'}`}>
        <Modal show={show} />
      </div> */}
      

    </>
  )
}
