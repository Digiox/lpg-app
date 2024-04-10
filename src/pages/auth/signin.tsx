import { useSession, signIn, signOut } from "next-auth/react"
const SignIn = () => {


    return <div>
        <button onClick={() => {signIn()}}>Sign In</button>

    </div>
}

export default SignIn