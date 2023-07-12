import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import '../layout/layout.css'
import { UserAuth } from "../context/AuthContext"

export const Layout = () => {
  const { user, logOut} = UserAuth()
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (<>
    <div className="wrp">
      <header className="header">

        <div className="header-wrp">
            <Link to='/'>
              <h1>Cinema track</h1>
            </Link>
        
            <div className="header-links">
              <NavLink to="/">Main</NavLink>
              <NavLink to="/movies">Movies</NavLink>
              <NavLink to="/favorites">Favorites</NavLink>
              <NavLink to="/search">Search</NavLink>
            </div>

            {
              user?.email ? (
                <div>
                  <Link to='/account'>
                    <h3>Account</h3>
                  </Link>
                    <h3 onClick={handleLogout}>Logout</h3>
              </div>
              ) : (
                <div>
                  <Link to='/login'>
                    <h3>Sign In</h3>
                  </Link>
                  <Link to= '/signup'>
                    <h3>Sign Up</h3>
                  </Link>
                </div>

              )
            }

        </div>
        

      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  </>

  )
}
