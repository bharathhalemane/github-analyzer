import './NotFound.css'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return <div className='not-found-page'>
        <img src="https://res.cloudinary.com/dfomcgwro/image/upload/v1771442722/Group_7519_xp5hil.png" alt='not found' />
        <h1>PAGE NOT FOUND</h1>
        <p>we're sorry, the page you requested could not be found Please go back to the homepage</p>
        <Link to="/"><button>Go to Home</button></Link>
    </div>
}

export default NotFound