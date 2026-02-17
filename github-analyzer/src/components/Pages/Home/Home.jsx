import './Home.css'
import Header from '../../utils/Header/Header'
import { MdSearch, MdLocationOn } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { useState, useEffect } from "react"
import { Octokit } from "@octokit/rest"
import { TailSpin } from 'react-loader-spinner'

const apiProgress = {
    start: "START",
    loading: "LOADING",
    success: "SUCCESS",
    failure: "FAILURE",
    offline: "OFFLINE"
}

const Home = () => {
    const [username, setUsername] = useState("")
    const [userData, setUserData] = useState(null)
    const [progress, setProgress] = useState(apiProgress.start)
    const [error, setError] = useState("");
    const [isOnline, setIsOnline] = useState(navigator.onLine)
    const octokit = new Octokit()

    useEffect(() => {
        const handleOffline = () => setProgress(apiProgress.offline)

        window.addEventListener("offline", handleOffline)

        return () => {
            window.removeEventListener("offline", handleOffline)
        }
    }, [])


    const onChangeUsername = e => {
        setUsername(e.target.value)
    }

    const onSubmitUsername = async (e) => {
        e.preventDefault()
        if (!username) {
            return setError("Enter the valid github username")
        }
        setProgress(apiProgress.loading)
        try {
            const response = await octokit.request('GET /users/{username}', {
                username: username
            })
            if (response.status === 200) {
                setProgress(apiProgress.success)
                const data = response.data
                console.log(data)
                const formattedData = {
                    avatarUrl: data.avatar_url,
                    id: data.id,
                    login: data.login,
                    bio: data.bio,
                    company: data.company,
                    email: data.email,
                    followers: data.followers,
                    following: data.following,
                    htmlUrl: data.html_url,
                    location: data.location,
                    name: data.name,
                    publicRepos: data.public_repos,
                    reposUrl: data.repos_url,
                }
                console.log(formattedData)
                setUserData(formattedData)
                setError("")
            } else {
                setProgress(apiProgress.failure)
                setError("Enter the valid github username")
            }
        } catch (err) {
            setProgress(apiProgress.failure)
            console.log("User not found", err)
        }
    }

    const startCase = () => (
        <>        <h1>Github Profile Visualizer</h1>
            <img src="https://res.cloudinary.com/dfomcgwro/image/upload/v1771268068/Group_2_ctaq2g.png" alt='' /></>
    )

    const failureView = () => (
        <>
            <h1>Github Profile Visualizer</h1>
            <img src="https://res.cloudinary.com/dfomcgwro/image/upload/v1771354346/Group_7522_gr1qab.png" alt='' />
            <p className='warning-msg'>Something went wrong. Please try again</p>
            <button className='button-blue' onClick={() => { setError(""), setProgress(apiProgress.start) }}>Try again</button>
        </>
    )

    const loader = () => {
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

    const successView = () => {
        const { avatarUrl, name, login, bio, following, followers, publicRepos, location, htmlUrl } = userData
        const userDataList = [
            {
                name: "FOLLOWERS",
                value: followers
            },
            {
                name: 'FOLLOWING',
                value: following
            }, {
                name: "PUBLIC REPOS",
                value: publicRepos
            }
        ]
        return <div className='user-details'>
            <img src={avatarUrl} alt='avatar' className='avatar-img' />
            <h1 className='name'>{name}</h1>
            <h1 className='username'>{login}</h1>
            <p className='bio'>{bio}</p>
            <ul className='data-container'>
                {
                    userDataList.map(data => (
                        <li key={data.name} className='data-details'>
                            <h1 className='data-heading'>{data.name}</h1>
                            <p className='data-value'>{data.value}</p>
                        </li>
                    ))
                }
                <li key="LOCATION" className='data-details'>
                    <h1 className='data-heading'>LOCATION</h1>
                    <p className='data-value'><MdLocationOn /> {location}</p>
                </li>
                <li key="PROFILE" className='data-details'>
                    <h1 className='data-heading'>GITHUB</h1>
                    <a className='github-url' href={htmlUrl} target='_blank'><FaGithub /> Click here</a>
                </li>
            </ul>
        </div>
    }
    const renderContent = () => {
        switch (progress) {
            case apiProgress.start:
                return startCase()
            case apiProgress.failure:
                return failureView()
            case apiProgress.offline:
                return failureView()
            case apiProgress.loading:
                return loader()
            case apiProgress.success:
                return successView()
            default:
                return null
        }
    }
    return (
        <div className="home-container">
            <Header activeId="home" />
            <div className='dashboard'>
                <div>
                    <form className={`form-input ${error ? "form-error" : ""}`} onSubmit={onSubmitUsername}>
                        <input placeholder='Enter github username' onChange={onChangeUsername} value={username} />
                        <button type="submit" className='submit-btn'><MdSearch /></button>
                    </form>
                    {error && <p className='error-msg'>{error}</p>}
                </div>
                {renderContent()}
            </div>
        </div>
    )
}

export default Home