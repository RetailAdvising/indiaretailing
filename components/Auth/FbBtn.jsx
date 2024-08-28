import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image';
const FbBtn = () => {
  const { data: session } = useSession();
  // console.log(data,'data')
  console.log(session, 'session')
  return (
    <>
      {/* {!session ? (
        <button onClick={async () => {
          await signIn('facebook', {
            callbackUrl: `${window.location.origin}`,
            redirect: true,
          })
        }}>Sign in with Facebook</button>
      ) : (
        <button onClick={() => signOut()}>Sign out</button>
      )} */}


      {/* await signIn('linkedin', {
          // callbackUrl: `http://localhost:3000/auth/signin`,
          callbackUrl: `${window.location.origin}/auth/signin`,
          redirect: true,
        }) */}

      <Image height={20} onClick={async () => {
        // await signIn('linkedin')
        // {callbackUrl: `http://localhost:3000/api/auth/callback/linkedin`}
        await signIn('linkedin')
        // await signIn('linkedin',{callbackUrl: `http://localhost:3000/auth/signin`})
      }} className='h-[25px] w-[25px] object-contain cursor-pointer' width={20} alt='facebook' src={'/login/linkedin.webp'} />


      {/* <Image height={20} onClick={async () => {
          await signIn('facebook', {
            callbackUrl: `${window.location.origin}`,
            redirect: true,
          })
        }} className='h-[25px] w-[25px] object-contain cursor-pointer' width={20} alt='facebook' src={'/login/fb-01.svg'} /> */}
    </>
  )
}

export default FbBtn
