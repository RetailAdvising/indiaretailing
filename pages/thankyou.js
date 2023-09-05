import React, { useEffect, useState } from 'react'



export default function thankyou({id}) {

   useEffect(()=>{
     console.log(id)
   },[])  

   return(
    <>
      
    </>
   )
}

export async function getServerSideProps({ query }) {
   let id = query.order_id
   return {
    props : id
   }
}