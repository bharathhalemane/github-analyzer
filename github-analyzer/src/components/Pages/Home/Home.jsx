import './Home.css'
import Header from '../../utils/Header/Header'
import { MdSearch } from "react-icons/md";

const Home = () => {
    return (
        <div className="home-container">
            <Header activeId="home" />
            <div className='dashboard'>
                <form className='form-input'>
                    <input placeholder='Enter github username'/>
                    <button type="submit"><MdSearch/></button>
                </form>
                <h1>Github Profile Visualizer</h1>
                <img src="https://res.cloudinary.com/dfomcgwro/image/upload/v1771268068/Group_2_ctaq2g.png" alt=''/>
            </div>
        </div>
    )
}

export default Home