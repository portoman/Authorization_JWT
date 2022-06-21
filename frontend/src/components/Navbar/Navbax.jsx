import { Link } from 'react-router-dom'

function Navbar () {
    return (
        <ul id="Navbar">
            <Link to={'/'}>
                <li>Home</li>
            </Link>
            <Link to={'/public/'}>
                <li>Public</li>
            </Link>
            <Link to={'/private/'}>
                <li>Private</li>
            </Link>
        </ul>
    )
}

export default Navbar