import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const options = {
  providers: [
    GoogleProvider({
      clientId: "630423705748-pg41popq5up1nsvs08i7n0ia47fkpt01.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  // Optional SQL or MongoDB database to persist users
  // database: process.env.DATABASE_URL,
};

export default NextAuth(options);
