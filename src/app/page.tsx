import SignIn from "@/components/sign-in";
import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";

export default async function Home() {
  const words = ["Modern", "Better", "Simpler",];
  return (
    <div className="min-h-screen bg-slate-500  flex flex-col justify-center items-center">
      <div className="h-[40rem] flex justify-center items-center px-4">
      <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        
        <FlipWords words={words} /> Sheets
      </div>
    </div>
      <div className="text-5xl font-bold mb-8">
        SocialCalc
      </div>
      <SignIn/>
    </div>
  );
}
