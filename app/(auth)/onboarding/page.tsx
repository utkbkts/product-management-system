import OnBoardingForm from "@/components/authenticate/onboarding-form";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

const Onboarding = async () => {
  const session = await auth();

  if (!session) redirect("/login");

  return (
    <div className="h-screen w-full flex justify-center items-center p-6">
      <OnBoardingForm session={session} />
    </div>
  );
};

export default Onboarding;
