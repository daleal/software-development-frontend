import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';
import * as api from '@/api'

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        try {
          const response = await api.jwt.create(credentials?.username, credentials?.password)
          return { username: credentials?.username, ...response };
        } catch {
          return null
        }
      }
    })
  ],
})
