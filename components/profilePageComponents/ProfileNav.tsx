"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PROFILE_LINKS } from "@/constants/index";
import { Button, Spinner } from "../common";
import ChangeAvatarButton from "./ChangeAvatarButton";
import { useAuthContext } from "@/context/AuthContext";
import { deleteCookie } from "cookies-next";
import { useState } from "react";

const ProfileNav = () => {
  const [IsOpenModal, setIsOpenModal] = useState(false);
  const currentPath = usePathname();
  const router = useRouter();
  const { user, updateUser } = useAuthContext();
  const handleLogout = () => {
    router.push("/");
    localStorage.removeItem("user");
    deleteCookie("token");
    updateUser(null);
  };
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
        onClick={(_) => setIsOpenModal(true)}
      >
        Logout
      </Button>
      <LogoutModal
        isOpen={IsOpenModal}
        onClose={() => {
          setIsOpenModal(false);
        }}
        handleLogout={handleLogout}
      />
    </div>
  );
};

export default ProfileNav;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleLogout: () => void;
};

function LogoutModal({ isOpen, onClose, handleLogout }: Props) {
  if (!isOpen) return;
  const [isLogingout, setIsLoginout] = useState(false);
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-md max-w-md mx-auto mt-20"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-medium mb-4">Delete Review</h3>
        <p className="mb-4">Are you sure you want to delete this review?</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md flex items-center gap-1"
            onClick={(e) => {
              setIsLoginout(true);
              handleLogout();
            }}
            // disabled={isPending}
          >
            Logout {isLogingout && <Spinner size="4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
