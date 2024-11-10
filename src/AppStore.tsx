import { Button } from './components/ui/button'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { routes } from './constants/routes'
import useAuth from './hooks/contexts/useAuth'
import { LucideChevronDown, LucideShoppingCart } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './components/ui/dropdown-menu'

const getLinkStyle = (isActive: boolean): string =>
  `${isActive ? 'text-navLinkActive' : 'text-navLinkInactive'} cursor-pointer`

const AppInner = () => {
  // #region States and Variables =========================================================
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()
  // #endregion

  // #region Handler functions ============================================================
  const handleSignInButtonClicked = () => {
    navigate(routes.auth.name)
  }

  const handleLogoutButtonClick = () => {
    logout()
  }

  const handleDropdownItemClick = (item: string) => {
    navigate(item)
  }
  // #endregion

  // #region Render functions =============================================================
  const renderNavbar = () => {
    return (
      <nav className='px-8 py-4 flex flex-nowrap items-center bg-white'>
        <div className='flex items-center flex-nowrap gap-4'>
          <img src={`/assets/images/logo.jpg`} alt='logo' className='w-12 h-12' />
          <div>
            <p className='text-2xl h-5'>Perfume</p>
            <p className='text-2xl'>Point</p>
          </div>
        </div>
        <div className='mx-auto md:flex items-center gap-8 hidden'>
          <NavLink to='/' className={({ isActive }) => getLinkStyle(isActive)}>
            Home
          </NavLink>
          <NavLink to='/notes' className={({ isActive }) => getLinkStyle(isActive)}>
            Notes
          </NavLink>
          <NavLink to='/perfumes' className={({ isActive }) => getLinkStyle(isActive)}>
            Perfumes
          </NavLink>
          <NavLink to='/about' className={({ isActive }) => getLinkStyle(isActive)}>
            About us
          </NavLink>
        </div>
        <div className='flex-1 flex justify-end md:flex-none'>
          {!isAuthenticated ? (
            <Button onClick={handleSignInButtonClicked}>Sign in</Button>
          ) : (
            <div className='flex items-center gap-4 flex-nowrap'>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className='flex items-center flex-nowrap gap-1'>
                    {user?.firstName} <LucideChevronDown size={16} className='relative top-[1px]' />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleDropdownItemClick('profile')}>Account</DropdownMenuItem>
                  <DropdownMenuItem>Orders</DropdownMenuItem>
                  <DropdownMenuItem>Returns</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='text-red-600' onClick={handleLogoutButtonClick}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <LucideShoppingCart size={20} />
            </div>
          )}
        </div>
      </nav>
    )
  }
  // #endregion
  return (
    <div className='bg-pageBackground w-screen h-screen overflow-hidden flex flex-col'>
      {renderNavbar()}
      <div className='w-full h-full p-4'>
        <Outlet />
      </div>
    </div>
  )
}

export default AppInner