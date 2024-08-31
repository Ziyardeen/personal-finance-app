import { NavLink } from 'react-router-dom'
import './nav.scss'

const Nav = () => {
    return (
    <nav className='nav'>
        <li><a href="/">Home</a></li>
        <li><a href="/display">Display List</a></li>
        <li><a href="/charts">View Charts</a></li>
    </nav>)
}

export default Nav
