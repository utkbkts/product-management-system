"use client";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useMenuStore } from "@/store/toggleMenuStore";
import { signOut } from "next-auth/react";
const LogoutButton = () => {
  const { menuOpen } = useMenuStore();
  return (
    <div>
      <Button asChild onClick={() => signOut()}>
        <Link href={"/"} className="flex gap-2">
          <LogOut />
          <span
            className={`${!menuOpen && "max-md:hidden"} ${
              menuOpen && "hidden"
            }`}
          >
            Log Out
          </span>
        </Link>
      </Button>
    </div>
  );
};

export default LogoutButton;
