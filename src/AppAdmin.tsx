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
import { USER_ROLE } from './types/entity/User'

const getLinkStyle = (isActive: boolean): string => (isActive ? 'text-navLinkActive' : 'text-navLinkInactive')

const AppAdmin = () => {
  // #region States and Variables =========================================================
  const { user, logout } = useAuth()
  // #endregion

  // #region Handler functions ============================================================

  const handleLogoutButtonClick = () => {
    logout()
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
        <div className='mx-auto flex items-center gap-8'>
          <NavLink to='/' className={({ isActive }) => getLinkStyle(isActive)}>
            Home
          </NavLink>
          {user?.role === USER_ROLE.PRODUCT_MANAGER ? (
            <>
              <NavLink to='/products' className={({ isActive }) => getLinkStyle(isActive)}>
                Products
              </NavLink>
              <NavLink to='/reviews' className={({ isActive }) => getLinkStyle(isActive)}>
                Reviews
              </NavLink>
              <NavLink to='/orders' className={({ isActive }) => getLinkStyle(isActive)}>
                Orders
              </NavLink>
              <NavLink to='/categories' className={({ isActive }) => getLinkStyle(isActive)}>
                Product Categories
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to='/refunds' className={({ isActive }) => getLinkStyle(isActive)}>
                Refunds
              </NavLink>
              <NavLink to='/discounts' className={({ isActive }) => getLinkStyle(isActive)}>
                Discounts
              </NavLink>
            </>
          )}
        </div>
        <div className='mr-4'>
          <div className='flex items-center gap-4 flex-nowrap'>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className='flex items-center flex-nowrap gap-1'>
                  {user?.firstName} <LucideChevronDown size={16} className='relative top-[1px]' />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='text-red-600' onClick={handleLogoutButtonClick}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    )
  }
  // #endregion
  return (
    <div className='bg-pageBackground w-screen h-screen'>
      {renderNavbar()}
      <Outlet />
    </div>
  )
}

export default AppAdmin
