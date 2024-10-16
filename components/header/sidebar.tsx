"use client";

import { useMenuStore } from "@/store/toggleMenuStore";
import { motion } from "framer-motion";
import LogoutButton from "../authenticate/logout-button";
import MenuLinks from "./menu-links";
import useRouteCheck from "@/hooks/useRouteCheck";
import { useEffect, useState } from "react";

const Sidebar = () => {
  // if (loginRoute || registerRoute) return;
  const { menuOpen } = useMenuStore();
  const loginRoute = useRouteCheck(["login"]);
  const registerRoute = useRouteCheck(["register"]);
  const onboardingRoute = useRouteCheck(["onboarding"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loginRoute && !onboardingRoute && !registerRoute) {
      setLoading(false);
    }
  }, [loginRoute, onboardingRoute, registerRoute]);

  if (loading || loginRoute || registerRoute || onboardingRoute) {
    return null;
  }
  return (
    <motion.div
      initial={{ width: menuOpen ? 80 : 250 }}
      animate={{ width: menuOpen ? 80 : 250 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`sticky z-10 top-0 flex flex-col h-screen items-center overflow-hidden py-10 border-r max-md:max-w-[80px] ${
        menuOpen ? "max-md:hidden gap-10" : "block justify-between"
      }`}
    >
      <h2 className={`text-xl font-bold max-md:hidden ${menuOpen && "hidden"}`}>
        Product Management System
      </h2>
      <MenuLinks menuOpen={menuOpen} />
      <LogoutButton />
    </motion.div>
  );
};

export default Sidebar;
