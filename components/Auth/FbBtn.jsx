import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image';
import { useLinkedIn } from 'react-linkedin-login-oauth2';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FbBtn = () => {
  const { data: session } = useSession();
  // console.log(data,'data')
  // console.log(session, 'session')
  const { linkedInLogin } = useLinkedIn({
    clientId: "86b4qk3ibf9z8c",
    redirectUri: `https://indiaretail.vercel.app/auth/signin`,
    // redirectUri: `http://localhost:3000/auth/signin`,
    // redirectUri: `http://localhost:3000/api/auth/callback/linkedin`,
    // redirectUri: `${window.location.origin}/linkedin`,
    scope: "email profile w_member_social openid",
    state: "86b4qk3ibf9z8c",
    // email profile
    onSuccess: async (code) => {
      // console.log(code);
      const accessToken = await handleLogin(code)
      if(accessToken){
        await getUserEmail(accessToken)
      }
      // console.log(await getAuthorization(),"getAuthorization")
      // console.log(await getAccessToken(code), "code accesss")
    },
    onError: (error) => {
      console.log(error);
    },
  });
  
  const handleLogin = async (code) => {
    const clientId = '86b4qk3ibf9z8c';
    const redirectUri = 'http://localhost:3000/auth/signin'; // Your server-side callback
    const scope = 'profile email';
    const code1 = code
    const state = '86b4qk3ibf9z8c'; // Optional state parameter

    // const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_secret=6Mt84X5h8156yGS2&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=${state}&code=${code1}`;

    // window.location.href = authUrl;

    // ?code=${code1}
    // let url = `http://localhost:3000/api/auth/signin`;
    let url = "https://indiaretail.vercel.app/api/auth/signin"
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          code: code1
        })
      });


      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching access Authorization:', errorData);
        throw new Error(`Failed to fetch access Authorization: ${errorData.error_description}`);
      }

      const data = await response.json();
      // console.log(data,"data")
      if(data.status == "Success"){
        return data.access_token;
      }else{
        toast.error(data.error)
        return undefined
      }

    } catch (error) {
      console.error('Error in Authorization:', error);
      throw error; // Re-throw the error after logging it
    }

  };

  async function getAuthorization() {
    // const { LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, NEXTAUTH_URL } = process.env;
    const tokenUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86b4qk3ibf9z8c&redirect_uri=http://localhost:3000/auth/signin&scope=profile email`;
    // const tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken';

    try {
      const response = await fetch(tokenUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching access Authorization:', errorData);
        throw new Error(`Failed to fetch access Authorization: ${errorData.error_description}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error in Authorization:', error);
      throw error; // Re-throw the error after logging it
    }
  }

  

  async function getAccessToken(code) {
    // const { LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, NEXTAUTH_URL } = process.env;
    const tokenUrl = `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&client_id=86b4qk3ibf9z8c&client_secret=6Mt84X5h8156yGS2&code=${code}&redirect_uri=http://localhost:3000/auth/signin`;
    // const tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken';

    try {
      // const response = await fetch(tokenUrl, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   },
      //   body: new URLSearchParams({
      //     grant_type: 'authorization_code',
      //     code,
      //     redirect_uri: `http://localhost:3000/auth/signin`,
      //     client_id: "86b4qk3ibf9z8c",
      //     client_secret: "6Mt84X5h8156yGS2"
      //   })
      // });

      const response = await fetch(tokenUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching access token:', errorData);
        throw new Error(`Failed to fetch access token: ${errorData.error_description}`);
      }

      const data = await response.json();
      return data.access_token; // Extract the access token

    } catch (error) {
      console.error('Error in getAccessToken:', error);
      throw error; // Re-throw the error after logging it
    }
  }

  async function getUserEmail(accessToken) {
    // const emailUrl = 'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))';
    // const emailUrl = 'https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))';

    // const response = await fetch(emailUrl, {
    //   method:'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${accessToken}`
    //   }
    // });

    // const data = await response.json();
    // console.log(data,"data")
    // return data.elements[0]['handle~'].emailAddress; // Extract the email address

    // try {
    //   const response = await fetch(emailUrl, {
    //     method: 'GET',
    //     headers: {
    //       'Authorization': `Bearer ${accessToken}`,
    //       'Content-Type': 'application/json'
    //     }
    //   });
  
    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
    //   }
  
    //   const data = await response.json();
    //   console.log('Member Handles Data:', data);
    //   return data;
  
    // } catch (error) {
    //   console.error('Error fetching member handles:', error);
    //   throw error;
    // }

    // let url = `http://localhost:3000/api/auth/get_user`;
    let url = `https://indiaretail.vercel.app/api/auth/get_user`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          accessToken: accessToken
        })
      });


      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching access Authorization:', errorData);
        toast.error(errorData.error_description)
        // throw new Error(`Failed to fetch access Authorization: ${errorData.error_description}`);
      }

      const data = await response.json();
      console.log(data,"data")
      if(data.status == "Success"){
        return data;
      }else{
        toast.error(data.error)
        return undefined
      }

    } catch (error) {
      console.error('Error in Authorization:', error);
      throw error; // Re-throw the error after logging it
    }

  }

  return (
    <>
    <ToastContainer position={'bottom-right'} autoClose={2000} />
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

      {/* <Image height={20} onClick={async () => {
        // await signIn('linkedin')
        // {callbackUrl: `http://localhost:3000/api/auth/callback/linkedin`}
        await signIn('linkedin')
        // await signIn('linkedin',{callbackUrl: `http://localhost:3000/auth/signin`})
      }} className='h-[25px] w-[25px] object-contain cursor-pointer' width={20} alt='facebook' src={'/login/linkedin.webp'} /> */}

      <Image height={20} onClick={linkedInLogin} className='h-[25px] w-[25px] object-contain cursor-pointer' width={20} alt='linkedin' src={'/login/linkedin.webp'} />


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
