import './Header.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { MdMenu } from "react-icons/md";

const navLinks = [
  { id: "home", name: "Home", path: "/" },
  { id: "repositories", name: "Repositories", path: "/repositories" },
  { id: "analysis", name: "Analysis", path: "/analysis" }
]

const Header = (props) => {
  const { activeId } = props
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const setMenu = () => {
    setMobileMenuOpen(prev => !prev)
  }

  return (
    <div>
      <nav className='desktop-nav'>
        <h1>Github Profile Visualizer</h1>
        <ul>
          {navLinks.map(link => (
            <li key={link.id}>
              <Link
                className={`links ${activeId === link.id ? "active-id" : ""}`}
                to={link.path}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav className='mobile-nav'>
        <div className='headers'>
          <h1>Github Profile Visualizer</h1>
          <div onClick={setMenu}><MdMenu/></div>
        </div>

        <ul className={`mobile-links ${mobileMenuOpen ? "" : "d-none"}`}>
          {navLinks.map(link => (
            <li key={link.id}>
              <Link
                className={`links ${activeId === link.id ? "active-id" : ""}`}
                to={link.path}
              >
                {link.name}
              </Link>
            </li>
          ))}
              </ul>
      </nav>
    </div>
  )
}

export default Header
