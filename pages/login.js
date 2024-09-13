import LogIn from '@/components/Auth/LogIn'
import SignUp from '@/components/Auth/SignUp'
import Advertisement from '@/components/Baners/Advertisement'
import Modal from '@/components/common/Modal'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function login() {
  const [shows, setShows] = useState(false);
  const route = useRouter()

  useEffect(() => {
    if (localStorage["apikey"]) {
      // console.log("l");
      route.push("/")
    }
  }, [shows])
  return (
    <>
      <Advertisement data={null} position={'high'} adId={'video_below-1'} insStyle={"display:inline-block;width:728px;height:90px;"} divClass={`h-[90px] w-[728px] m-auto`} />
      <Advertisement data={null} position={'small'} adId={'infocus-1'} insStyle={"display:inline-block;width:300px;height:250px;"} divClass={`h-[250px] w-[300px] m-auto`} />
      <LogIn show={shows} goPass={() => setShows(!shows)} />
      <Advertisement data={null} position={'high'} adId={'video_below-2'} insStyle={"display:inline-block;width:728px;height:90px;"} divClass={`h-[90px] w-[728px] m-auto`} />
      <Advertisement data={null} position={'small'} adId={'infocus-2'} insStyle={"display:inline-block;width:300px;height:250px;"} divClass={`h-[250px] w-[300px] m-auto`} />

      {/* <button onClick={()=> setShow(!show)}>modal popup</button>

      <div className={`${show ? 'modalActive' : 'modalContainer'}`}>
        <Modal show={show} />
      </div> */}


    </>
  )
}
