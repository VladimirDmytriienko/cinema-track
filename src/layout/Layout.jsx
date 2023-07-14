import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import '../layout/layout.css'
import { UserAuth } from "../context/AuthContext"
import { ToastContainer } from "react-toastify"
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import TheatersOutlinedIcon from '@mui/icons-material/TheatersOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';

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
            <Link className="header-logo" to='/'>
              <h1>Cinema track</h1>
            </Link>
        
            <div className="header-links">
              <NavLink to="/"> <HomeOutlinedIcon/> <span>Home</span> </NavLink>
              <NavLink to="/movies"><TheatersOutlinedIcon/> <span>Movies</span> </NavLink>
              {/* <NavLink to="/favorites">Favorites</NavLink> */}
              <NavLink to="/search"><SearchRoundedIcon/> <span>Search</span> </NavLink>
            </div>
            <ToastContainer  theme="dark"/>
            {
              user?.email ? (
                <div className="log-wrapper">
                  <Link to='/account'>
                    <AccountCircleOutlinedIcon/> <h3>Account</h3>
                  </Link>
                  <span className="logout" onClick={handleLogout}><LogoutOutlinedIcon/> <h3 >Logout</h3></span>
                  
              </div>
              ) : (
                <div className="log-wrapper">
                  <Link to='/login'>
                   <LoginOutlinedIcon/><h3>Sign In</h3>
                  </Link>
                  <Link to= '/signup'>
                     <AppRegistrationOutlinedIcon/> <h3>Sign Up</h3>
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
