"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PROFILE_LINKS } from "@/constants/index";
import { Button } from "../common";
import ChangeAvatarButton from "./ChangeAvatarButton";
import { useAuthContext } from "@/context/AuthContext";

const ProfileNav = () => {
  const currentPath = usePathname();
  const router = useRouter();
  const { user } = useAuthContext();
  return (
    <div className="bg-primary px-4 py-10 h-fit">
      <div className="flex flex-col items-center mb-10">
        <ChangeAvatarButton />
        <h2 className="text-xl font-semibold">{user?.fullName}</h2>
      </div>
      <nav className="hidden sm:block">
        <ul className="flex flex-col gap-3 w-56">
          {PROFILE_LINKS.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className={`${
                  currentPath === link.path
                    ? "text-text border-b border-b-black"
                    : "text-sub-text"
                } py-2 block`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* small devices nav */}
      <select
        className="sm:hidden border-2 border-sub-text  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
      w-full p-2 "
        onChange={(e) => router.push(e.target.value)}
        value={currentPath}
      >
        {PROFILE_LINKS.map((link) => (
          <option key={link.name} value={link.path}>
            {link.name}
          </option>
        ))}
      </select>
      <Button
        className="text-sub-text py-2 w-full mt-2"
        onClick={() => {localStorage.removeItem("user"); router.push("/");}}
      >
        Logout
      </Button>
    </div>
  );
};

export default ProfileNav;
