// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth'
import SteamProvider, { PROVIDER_ID } from 'next-auth-steam'

import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    return NextAuth(req, res, {
        providers: [
            SteamProvider(req, {
                clientSecret: "8CF3471036ED5E1DF90E2FF1C9A1F0A4",
                callbackUrl: 'http://localhost:3000/api/auth/callback'
            })
        ],
        pages: {
            signIn: "/"
        },
        callbacks: {
            jwt({ token, account, profile }) {
                if (account?.provider === PROVIDER_ID) {
                    token.steam = profile
                }

                return token
            },
            session({ session, token }) {
                if ('steam' in token) {
                    // @ts-expect-error
                    session.user.steam = token.steam
                }

                return session
            }
        }
    })
}