"use client";
import React, { useEffect, useState } from "react";
import Logo from "./logo";
import MenuToggle from "./menu-toggle";
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useRouteCheck from "@/hooks/useRouteCheck";
import { Session } from "next-auth";
type HeaderProps = {
  session: Session | null;
};
const Header = (session: HeaderProps) => {
  const loginRoute = useRouteCheck(["login"]);
  const registerRoute = useRouteCheck(["register"]);
  const onboardingRoute = useRouteCheck(["onboarding"]);
  const [loading, setLoading] = useState(true);

  const user = session?.session?.user;
  console.log("🚀 ~ Header ~ user:", user);

  useEffect(() => {
    if (!loginRoute && !onboardingRoute && !registerRoute) {
      setLoading(false);
    }
  }, [loginRoute, onboardingRoute, registerRoute]);

  if (loading || loginRoute || registerRoute || onboardingRoute) {
    return null;
  }
  return (
    <nav className="py-4 border-b">
      <div className="w-[95%] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Logo />
          <MenuToggle />
        </div>
        <div className="flex gap-8 items-center">
          <ModeToggle />
          {user ? (
            <>
              {" "}
              <span className="max-md:hidden">
                Welcome Back {user?.name} 🙌
              </span>
              <Avatar>
                <AvatarImage src={user?.image ?? undefined} />
              </Avatar>
            </>
          ) : (
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
