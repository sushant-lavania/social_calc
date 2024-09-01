import SignIn from "@/components/sign-in";
import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";

export default async function Home() {
  const words = ["Modern", "Better", "Simpler",];
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="text-5xl font-bold mb-8">
        SocialCalc
      </div>
      <SignIn/>
    </div>
  );
}
