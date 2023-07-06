
import { NavLink, Outlet } from "react-router-dom"
import '../layout/layout.css'
export const Layout = () => {
  return (
    <>  
        <header className="header"> 
          <div>
            <h1>Cinema track</h1>
          </div>
          <div>
            <NavLink to="/">Main</NavLink>
            <NavLink to="/movies">Movies</NavLink>
            <NavLink to="/favorites">Favorites</NavLink>    
            <NavLink to="/search">Search</NavLink>    
          </div>  
          <div>
            <h3>Login</h3>
          </div>
            
        </header>
        <main>
            <Outlet></Outlet>
        </main> 
    </>
  )
}
