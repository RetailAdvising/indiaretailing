import { signIn, signOut, useSession } from 'next-auth/react'

const FbBtn = () => {
  const { data: session } = useSession();
  // console.log(data,'data')
  console.log(session, 'session')
  return (
    <>
      {!session ? (
        <button onClick={async () => {
          await signIn('facebook', {
            callbackUrl: `${window.location.origin}`,
          })
        }}>Sign in with Facebook</button>
      ) : (
        <button onClick={() => signOut()}>Sign out</button>
      )}
    </>
  )
}

export default FbBtn
