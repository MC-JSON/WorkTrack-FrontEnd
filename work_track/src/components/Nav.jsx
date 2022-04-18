import { Link } from 'react-router-dom'

//navigation bar built
const Nav = (authenticated, user, handleLogOut) => {
  let authenticatedOptions
  if (user) {
    authenticatedOptions = (
      <nav>
        <h3>welcome {user.name}!</h3>
        <Link to='/portal'>| Home </Link>
        <Link to='/createbusiness'>| CreateBusiness | </Link>
        <Link to='/createemployee'> CreateEmployee | </Link>
        <Link to='/'>Sign Out |</Link>
        <Link to="/register">Create Account</Link>

      </nav>
    )
  }


  const publicOptions = (
    <header>
      <nav className='navbar'>
        <div>
          {/* <Link to="/portal">Business Portal</Link> */}
          {/* <Link to="/signin">Login</Link> */}
          {/* <Link to="/register">Create Account</Link> */}
        </div>
      </nav>
    </header>
  )
  return (
    <div>
      {authenticated && user ? authenticatedOptions : publicOptions}
    </div>
  )
}

export default Nav