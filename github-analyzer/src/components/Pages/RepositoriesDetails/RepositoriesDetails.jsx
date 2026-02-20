//repoDetailsApi = `https://api.github.com/repos/${username}/${repoName}`
//contributorsDetailsApi = https://api.github.com/repos/${username}/${repoName}/contributors
//languagesApi = https://api.github.com/repos/${username}/${repoName}/languages

import './RepositoriesDetails.css'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import Header from '../../utils/Header/Header'
import { TailSpin } from "react-loader-spinner"
import PieChartData from '../../utils/PieChartData/PieChartData'
import { FaStar, FaEye, } from "react-icons/fa";
import { PiGitBranchBold } from "react-icons/pi";


const apiProgress = {
    success: "SUCCESS",
    failure: "FAILURE",
    loading: "LOADING",
    offline: "OFFLINE"
}

const RepositoriesDetails = ({ username }) => {
    const { repoName } = useParams()
    const [repoData, setRepoData] = useState({})
    const [contributors, setContributors] = useState([])
    const [languages, setLanguages] = useState({})
    const [progress, setProgress] = useState(apiProgress.loading)

    const formattedData = data => {
        return {
            description: data.description,
            forksCount: data.forks_count,
            htmlUrl: data.html_url,
            id: data.id,
            issuesCount : data.open_issues_count,
            name: data.name,
            stargazersCount: data.stargazers_count,
            topics: data.topics || [],
            watchersCount: data.watchers_count,
        }
    }

    const getRepoData = async () => {
        try {
            setProgress(apiProgress.loading)
            const url = `https://api.github.com/repos/${username}/${repoName}`
            const option = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
                }
            }
            const response = await fetch(url, option)
            if (response.status === 200) {
                const data = await response.json()
                console.log(data)
                const formattedRepoData = formattedData(data)
                setRepoData(formattedRepoData)
                
            } else {
                setProgress(apiProgress.failure)
            }
        } catch (err) {
            setProgress(apiProgress.failure)
        }
    }

    const formattedContributorsData = data => {
        return {
            avatarUrl: data.avatar_url,
            contributions: data.contributions
        }
    }

    const getContributors = async () => {
        try {
            const url = `https://api.github.com/repos/${username}/${repoName}/contributors`
            const option = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
                }
            }
            const response = await fetch(url, option)
            if (response.status === 200) {
                const data = await response.json() || []
                console.log(data)
                const formattedData = data.map(each => formattedContributorsData(each))
                setContributors(formattedData)
            } else {
                setProgress(apiProgress.failure)
            }
        } catch (err) {
            setProgress(apiProgress.failure)
        }
    }

    const getLanguages = async () => {
        try {
            const url = `https://api.github.com/repos/${username}/${repoName}/languages`
            const option = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
                }
            }
            const response = await fetch(url, option)
            if (response.status === 200) {
                const data = await response.json() || {}
                setLanguages(data)
                setProgress(apiProgress.success)
            } else {
                setProgress(apiProgress.failure)
            }
        } catch (err) {
            setProgress(apiProgress.failure)
        }
    }

    useEffect(() => {
        getRepoData()
        getContributors()
        getLanguages()
    }, [])

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

    const successView = () => {
        if (!repoData) return null
        const { name, description, topics, stargazersCount, forksCount, watchersCount, issuesCount} = repoData
        const commits = contributors.reduce(
            (acc, cur) => acc + cur.contributions,
            0
        )

        const colorClassNames = ["color-pink", 'color-green', 'color-blue', 'color-red', 'color-yellow']
        return <div className='repository-success-view'>
            <h1 className='repo-detail-head'>{name}</h1>
            <p className='repo-detail-description'>{description}</p>
            <ul className='topics-list'>
                {
                    (topics || []).map((topic, index) => (
                        <li key={topic} className={`${colorClassNames[index % colorClassNames.length]} topics`}>{topic}</li>
                    ))
                }

            </ul>
            <div className="repo-visualize-counts">
                <div className='counts'>
                    <FaStar color='#fbbf24' />
                    <p>{stargazersCount}</p>
                </div>
                <div className='counts'>
                    <FaEye color='#94a3bb' />
                    <p>{forksCount}</p>
                </div>
                <div className='counts'>
                    <PiGitBranchBold color='#94a3bb' size={20} />
                    <p>{watchersCount}</p>
                </div>
            </div>

            <div className="count-container">
                <div className='count'>
                    <h1>Commits Count</h1>
                    <p>{commits || 0}</p>
                </div>
                <div className='count'>
                    <h1>Issues Count</h1>
                    <p>{issuesCount || 0}</p>
                </div>
            </div>

            <div className="contributors-container">
                <h1>Contributors:</h1>
                <p>{contributors.length} Members</p>                
                {
                    contributors.length < 5 ?
                        <ul className="contributors-avatars">
                            {
                                (contributors || []).map(each => (
                                    <li key={each}>
                                        <img src={each.avatarUrl}  alt="avatar"/>
                                    </li>
                                ))
                            }
                        </ul>
                        : <ul className="contributors-avatars">
                            {
                                (contributors || []).slice(0,5).map(each => (
                                    <li key={each}>
                                        <img src={each.avatarUrl}  alt="avatar"/>
                                    </li>
                                ))
                            }
                            <li key="etc">
                                <div className="etc-image">+{contributors.length - 5}</div>
                            </li>
                        </ul>
                }
            </div>

            <div className="pieChart-list">
                <PieChartData raw={[languages]}/>
            </div>
        </div>
    }

const failureView = () => {
    return <div className='failure-view'>
        <img src='https://res.cloudinary.com/dfomcgwro/image/upload/v1771441459/Empty_Box_Illustration_1_dj86g2.png' alt="failure" />
        <h1>No Data Found</h1>
        <p>Github Username is empty, please provide a valid username for Repositories</p>
        <Link to="/"><button>Go to Home</button></Link>
    </div>
}

const renderContent = () => {
    switch (progress) {
        case apiProgress.loading:
            return renderLoading()
        case apiProgress.failure:
            return failureView()
        case apiProgress.offline:
            return offlineView()
        case apiProgress.success:
            return successView()
        default:
            return null
    }
}

return (
    <div>
        <Header activeId="repositories" />
        <div className="repo-details-content-container">
            {renderContent()}
        </div>
    </div>
)
}

export default RepositoriesDetails