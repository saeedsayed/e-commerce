// components
import OfferBar from "./OfferBar";
import NavLinks from "./NavLinks";
import NavIcons from "./NavIcons";
import SmallDeviceNav from "./SmallDevicesNav/SmallDeviceNav";
import { Logo } from "../common";

const NavBar = () => {
  return (
    <>
      <OfferBar />
      <div className="sticky top-0 z-40 bg-white">
        <div className="container">
          <header className="hidden sm:block">
            <div className="flex items-center justify-between py-4">
              <Logo />

              <NavLinks />
              <NavIcons />
            </div>
          </header>
          <SmallDeviceNav />
        </div>
      </div>
    </>
  );
};

export default NavBar;
