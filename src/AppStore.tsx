import { Button } from './components/ui/button'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { routes } from './data/routes'
import { cn } from './lib/utils'

const getLinkStyle = (isActive: boolean): string => (isActive ? 'text-navLinkActive' : 'text-navLinkInactive')

const AppInner = () => {
  // #region States and Variables =========================================================
  const navigate = useNavigate()
  // #endregion

  // #region Handler functions ============================================================
  const handleSignInButtonClicked = () => {
    navigate(routes.auth.name)
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
          <NavLink to='/' className={({ isActive }) => getLinkStyle(isActive)}>
            Notes
          </NavLink>
          <NavLink to='/' className={({ isActive }) => getLinkStyle(isActive)}>
            Perfumes
          </NavLink>
          <NavLink to='/about' className={({ isActive }) => getLinkStyle(isActive)}>
            About us
          </NavLink>
        </div>
        <div className='flex items-center flex-nowrap gap-4'>
          <Button onClick={handleSignInButtonClicked}>Sign in</Button>
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

export default AppInner
