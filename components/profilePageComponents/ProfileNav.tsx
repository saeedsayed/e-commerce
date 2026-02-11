"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PROFILE_LINKS } from "@/constants/index";
import { Button, Spinner } from "../common";
import ChangeAvatarButton from "./ChangeAvatarButton";
import { useAuthContext } from "@/context/AuthContext";
import { deleteCookie } from "cookies-next";
import { useState } from "react";
import { MdClose, MdLogout } from "react-icons/md";

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
  const [isLogingout, setIsLoginout] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-lg shadow-lg max-w-sm w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-sub-text">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-3 rounded-full">
                <MdLogout className="text-orange-600" size={24} />
              </div>
              <h2 className="text-lg font-semibold text-text">Logout</h2>
            </div>
            <button
              onClick={onClose}
              className="text-sub-text hover:text-text transition-colors"
              aria-label="Close modal"
            >
              <MdClose size={24} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            <p className="text-text mb-2 font-medium">
              Are you sure you want to logout?
            </p>
            <p className="text-sub-text text-sm">
              You will be redirected to the homepage and your session will end.
            </p>
          </div>

          {/* Modal Footer */}
          <div className="flex gap-3 p-6 border-t border-sub-text bg-gray-50">
            <button
              onClick={onClose}
              disabled={isLogingout}
              className="flex-1 px-4 py-2 border border-sub-text text-text rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setIsLoginout(true);
                handleLogout();
              }}
              disabled={isLogingout}
              className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors disabled:bg-orange-400 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
            >
              {isLogingout ? (
                <>
                  Logging out <Spinner size="4" />
                </>
              ) : (
                "Logout"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
