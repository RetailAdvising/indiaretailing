// pages/api/auth/[...nextauth].js
import nextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';

// export const authOptions = ({
//     // pages: {
//     //     signIn: '/auth/signin',
//     // },
//     providers: [
//         FacebookProvider({
//             clientId: process.env.FACEBOOK_CLIENT_ID,
//             clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//             authorization: { params: { scope: 'email', redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/facebook` } },
//             // clientId: "341622788230249",
//             // clientSecret: "53a83436a46c089d62799997af80a031",
//             // authorization: { params: { scope: 'email', redirect_uri: "https://indiaretail.vercel.app/api/auth/callback/facebook" } },
//         }),
//     ],
//     secret: process.env.AUTH_CLIENT_SECRET,
//     debug: true,
//     // secret: "53a83436a46c089d62799997af80a031341622788230249"
//     // Add additional NextAuth.js configurations as needed
// });


// // const handler = nextAuth(authOptions);
// export default (req, res) => nextAuth(req, res, authOptions)

// export { handler as GET, handler as POST }

export default nextAuth({
    // export const authOptions = ({
    // pages: {
    //     signIn: '/auth/signin',
    // },
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            // authorization: { params: { scope: 'email',redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/facebook",response_type: 'code' }},
        }),
    ],
    secret: process.env.AUTH_CLIENT_SECRET,
    // jwt: false,

    // Add additional NextAuth.js configurations as needed
});