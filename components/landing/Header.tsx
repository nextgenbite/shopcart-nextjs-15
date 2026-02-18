"use client";
import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./headerMenu";
import Searchbar from "./Searchbar";
import CartIcon from "./CartIconBtn";
import FavoriteBtn from "./FavoriteBtn";
import LoginBtn from "./LoginBtn";
import MobileMenu from "./MobileMenu";
import { useAuthStore } from "@/stores/authStore";
import { AuthDropdown } from "../auth/AuthDropdown";

const Header = () => {
  const { token } = useAuthStore();
  return (
    <header className="bg-white shadow-sm py-5">
      <Container className="flex items-center justify-between text-lightColor">
        <div className="w-auto md:w-1/3 flex justify-start items-center gap-2.5 md:gap-0">
          {/* {mobile menue btn} */}
          <MobileMenu />
          {/* logo */}
          <Logo />
        </div>
        {/* menu */}
        <HeaderMenu />
        {/* action buttons */}
        <div className=" flex items-end gap-5">
          <Searchbar />
          <CartIcon />
          <FavoriteBtn />
          {token ? (
            <AuthDropdown />
          ) : (
            <LoginBtn />
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
