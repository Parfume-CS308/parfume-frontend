import { Button } from "./components/ui/button";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { routes } from "./constants/routes";
import useAuth from "./hooks/contexts/useAuth";
import { LucideChevronDown, LucideShoppingCart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import useCart from "./hooks/contexts/useCart";

const getLinkStyle = (isActive: boolean): string =>
  isActive ? "text-navLinkActive" : "text-navLinkInactive";

const AppInner = () => {
  // #region States and Variables =========================================================
  const navigate = useNavigate();
  const { basket } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  // #endregion

  // #region Handler functions ============================================================
  const handleSignInButtonClicked = () => {
    navigate(routes.auth.pathname);
  };

  const handleLogoutButtonClick = () => {
    logout();
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  console.log("FILTERED isAuth", isAuthenticated);
  // #endregion

  // #region Render functions =============================================================
  const renderCartButton = () => {
    return (
      <div className="relative cursor-pointer" onClick={handleCartClick}>
        <LucideShoppingCart size={20} />
        {basket.length > 0 && (
          <div className="absolute top-[-10px] right-[-10px] bg-red-600 rounded-full h-4 w-4 flex items-center justify-center text-white text-[0.5rem]">
            {basket.length}
          </div>
        )}
      </div>
    );
  };

  const renderNavbar = () => {
    return (
      <nav className="px-8 py-4 flex flex-nowrap items-center bg-white">
        <div className="flex items-center flex-nowrap gap-4">
          <img
            src={`/assets/images/logo.jpg`}
            alt="logo"
            className="w-12 h-12"
          />
          <div>
            <p className="text-2xl h-5">Perfume</p>
            <p className="text-2xl">Point</p>
          </div>
        </div>
        <div className="mx-auto flex items-center gap-8">
          <NavLink to="/" className={({ isActive }) => getLinkStyle(isActive)}>
            Home
          </NavLink>
          <NavLink
            to="/notes"
            className={({ isActive }) => getLinkStyle(isActive)}
          >
            Notes
          </NavLink>
          <NavLink
            to="/perfumes"
            className={({ isActive }) => getLinkStyle(isActive)}
          >
            Perfumes
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => getLinkStyle(isActive)}
          >
            About us
          </NavLink>
        </div>
        <div className="mr-4">
          {!isAuthenticated ? (
            <Button onClick={handleSignInButtonClicked}>Sign in</Button>
          ) : (
            <div className="flex items-center gap-4 flex-nowrap">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center flex-nowrap gap-1">
                    {user?.firstName}{" "}
                    <LucideChevronDown
                      size={16}
                      className="relative top-[1px]"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Account</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/orders")}>
                    Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem>Returns</DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={handleLogoutButtonClick}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
        {renderCartButton()}
      </nav>
    );
  };
  // #endregion
  return (
    <div className="bg-pageBackground w-screen h-screen">
      {renderNavbar()}
      <Outlet />
    </div>
  );
};

export default AppInner;
