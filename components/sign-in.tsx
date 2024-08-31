
import { signIn } from "@/auth"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google",{redirectTo:"/dashboard"})
      }}
      
    >
      {/* <div className="text-2xl p-10">
        Create an account
      </div>
      <div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input className="border border-black" type="email" id="email" placeholder="Email" />
      </div>
      <div className="grid w-full mt-3 max-w-sm items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input className="border border-black" type="password" id="password" placeholder="Password" />
      </div>
        
      </div>

    <Button className="mt-5 mr-6">Signin</Button> */}
    <Button  className="mt-5">Signin with Google</Button>
      
    </form>
  )
} 