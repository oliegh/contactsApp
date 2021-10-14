import { useContext } from "react"
import { NavLink, useHistory } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"


export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <nav>
      <div className="nav-wrapper blue darken-1">
        <a href="/" class="brand-logo">Контакты</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><NavLink to="/contacts">Контакты</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
    </nav>
  )
}