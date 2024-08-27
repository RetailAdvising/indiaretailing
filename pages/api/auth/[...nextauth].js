// pages/api/auth/[...nextauth].js
import nextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import AppleProvider from 'next-auth/providers/apple'
import LinkedInProvider from 'next-auth/providers/linkedin';
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
            clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET,
            // authorization: { params: { scope: 'email',redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/facebook",response_type: 'code' }},
        }),
        AppleProvider({
            clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_APPLE_CLIENT_SECRET,
        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        }),

    ],
    secret: process.env.NEXT_PUBLIC_AUTH_CLIENT_SECRET,
    debug: true,
    // session: {
    //     strategy: 'jwt'
    // },
    // logger:(method, message, ...args)=>{
    //     console.log(`NEXTAUTH LOGGER ${method}: ${message}`, ...args);
    // },
    //     callbacks: {
    //         async jwt(token, user, account, profile, isNewUser) {
    //           if (user) {
    //               token.userId = user.id;
    //           }
    //           return token;
    //       },
    //       async session(session, token) {
    //           session.user = token.user;
    //           delete session.error;
    //           return session;
    //       },
    //       async redirect(url, baseUrl) {
    //           return "/";
    //       },
    //   },
    cookies: {
        pkceCodeVerifier: {
            name: "next-auth.pkce.code_verifier",
            options: {
                httpOnly: true,
                sameSite: "none",
                path: '/',
                secure: true
            },
        },
    },
    callbacks: {
        session: async function ({ session, token }) {
            // session.user=token.user;
            session.customValue = new Date().toISOString()
            return Promise.resolve(session);
        }
    }


    // jwt: false,

    // Add additional NextAuth.js configurations as needed
});