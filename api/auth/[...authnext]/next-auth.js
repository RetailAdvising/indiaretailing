// next-auth.js
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: "630423705748-pg41popq5up1nsvs08i7n0ia47fkpt01.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  // Add other configuration options as needed
});
