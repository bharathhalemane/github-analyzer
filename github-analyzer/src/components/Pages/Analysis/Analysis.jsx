import Header from '../../utils/Header/Header'
import './Analysis.css'
import { TailSpin } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const apiProgress = {
    success: "SUCCESS",
    failure: "FAILURE",
    loading: "LOADING",
    offline: "OFFLINE"
}

const Analysis = ({ username }) => {
    const [progress, setProgress] = useState(apiProgress.loading)

    const offlineView = () => (
        <div className="failure-view">
            <img src="https://res.cloudinary.com/dfomcgwro/image/upload/v1771354346/Group_7522_gr1qab.png" alt='' />
            <p className='warning-msg'>Something went wrong. Please try again</p>
            <button className='button-blue' onClick={() => { setError(""), setProgress(apiProgress.start) }}>Try again</button>
        </div>
    )

    const renderLoading = () => {
        return <div className='loader'>
            <TailSpin
                height="40"
                width="40"
                color="#3b82f6"
                ariaLabel="tail-spin-loading"
                visible={true}
            />
        </div>
    }

    const failureView = () => {
        return <div className='failure-view'>
            <img src='https://res.cloudinary.com/dfomcgwro/image/upload/v1771441459/Empty_Box_Illustration_1_dj86g2.png' alt="failure" />
            <h1>Coming Soon</h1>
            {/* <p>Github Username is empty, please provide a valid username for Repositories</p> */}
            <Link to="/"><button>Go to Home</button></Link>
        </div>
    }

    const renderContent = () => {
        switch (apiProgress.failure) {
            case apiProgress.loading:
                return renderLoading()
            case apiProgress.failure:
                return failureView()
            case apiProgress.offline:
                return offlineView()
            default:
                return null
        }
    }



    return (
        <div>
            <Header activeId="analysis" />
            {renderContent()}
        </div>
    )
}

export default Analysis