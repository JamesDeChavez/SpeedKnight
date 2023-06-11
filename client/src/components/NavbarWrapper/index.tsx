import { Outlet } from "react-router-dom"
import Navbar from "../Navbar"

const NavbarWrapper = () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    )
}

export default NavbarWrapper