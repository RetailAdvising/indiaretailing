import LogIn from '@/components/Auth/LogIn'
import SignUp from '@/components/Auth/SignUp'
import Modal from '@/components/common/Modal'
import React, { useEffect, useState } from 'react'

export default function login() {
  const [shows,setShows] = useState(false);

  useEffect(()=>{
    console.log(shows)
  },[shows])
  return (
    <>
    
     <LogIn show={shows} goPass={()=> setShows(!shows)} /> 
    
      
      {/* <button onClick={()=> setShow(!show)}>modal popup</button>

      <div className={`${show ? 'modalActive' : 'modalContainer'}`}>
        <Modal show={show} />
      </div> */}
      

    </>
  )
}
