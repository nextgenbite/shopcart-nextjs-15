import  Container from "./container";
import Logo from "../logo";
import HeaderMenu from "./headerMenu";
import Searchbar from "./Searchbar";
import CartIcon from "./CartIconBtn";
import FavoriteBtn from "./FavoriteBtn";

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-5">
    <Container className="flex items-center justify-between bg-amber-50">
          {/* logo */}
          <Logo />
        {/* menu */}
        <HeaderMenu />
        {/* action buttons */}
       <div className=" flex items-end gap-5">
         <Searchbar />
        <CartIcon />
        <FavoriteBtn />
       </div>
    </Container>
    </header>
  );
}

export default Header;