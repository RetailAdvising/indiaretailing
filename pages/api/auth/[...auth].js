// next-auth.js
import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers';
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: "630423705748-pg41popq5up1nsvs08i7n0ia47fkpt01.apps.googleusercontent.com",
            clientSecret: "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",
        }),
    ],
    // Add other configuration options as needed
});