import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'

import User from '@models/user';
import { connectToDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  
  callbacks: {
    async session({ session }) { // Manter sessão
      const sessionUser = await User.findOne({ // Há 1 erro aqui pois nada é feito quando entro em uma página protegida sem estar logado além de dar erro
        email: session.user.email
      })
  
      session.user.id = sessionUser._id.toString()
  
      return session
    },
  
    async signIn({ profile }) {
      try {
        await connectToDB()
  
        const userExists = await User.findOne({
          email: profile.email
        })
  
        if(!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          })
        }
  
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
  }

})

export { handler as GET, handler as POST }