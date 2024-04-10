import passport from "passport";
import SteamStrategy from "passport-steam";
import dotenv from "dotenv"
dotenv.config()



import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("middleware");
  
  passport.use(new SteamStrategy({
    returnURL: `${process.env.ENDPOINT}/auth/steam/return`,
    realm: process.env.ENDPOINT ? process.env.ENDPOINT : "http://localhost:3000",
    apiKey: '8CF3471036ED5E1DF90E2FF1C9A1F0A4'
  },
  function(identifier, profile, done) {
    console.log("CALLBACK");
    
   console.log(profile);
   
  }
));
  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
}