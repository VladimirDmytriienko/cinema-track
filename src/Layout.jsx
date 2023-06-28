import { NavLink, Outlet } from "react-router-dom"

export const Layout = () => {
  return (
    <>  
        <header> 
            <h1>Cinema track</h1>
            <NavLink to="/">Main</NavLink>
            <NavLink to="/movies">Movies</NavLink>
            <NavLink to="/favorites">Favorites</NavLink>    
            <NavLink to="/search">Search</NavLink>    
        </header>
        <main>
            <Outlet></Outlet>
        </main> 
    </>
  )
}
