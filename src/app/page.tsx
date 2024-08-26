import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import SignOut from "@/components/sign-out";
import Image from "next/image";


export default async function Home() {
  const session=await auth()
  if(session?.user){
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">{session.user.name}</h1>
          <p className="text-sm text-gray-500">{session.user.email}</p>
        </div>
        <SignOut/>
      </main>
    );
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignIn/>
      
    </main>
  );
}
