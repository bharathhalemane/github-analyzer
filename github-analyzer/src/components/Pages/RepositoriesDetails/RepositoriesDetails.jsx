//repoDetailsApi = `https://api.github.com/repos/${username}/${repoName}`
//contributorsDetailsApi = https://api.github.com/repos/${username}/${repoName}/contributors
//languagesApi = https://api.github.com/repos/${username}/${repoName}/languages

import './RepositoriesDetails.css'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import Header from '../../utils/Header/Header'
import { TailSpin } from "react-loader-spinner"


const apiProgress = {
    success: "SUCCESS",
    failure: "FAILURE",
    loading: "LOADING",
    offline: "OFFLINE"
}

const RepositoriesDetails = ({ username }) => {
    const { repoName } = useParams()
    const [repoData, setRepoData] = useState()
    const [contributors, setContributors] = useState()
    const [languages, setLanguages] = useState()
    const [progress, setProgress] = useState(apiProgress.loading)

    const formattedData = data => {
        return {
            description: data.description,
            forksCount: data.forks_count,
            htmlUrl: data.html_url,
            id: data.id,
            name: data.name,
            stargazersCount: data.stargazers_count,
            topics: data.topics,
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
                const data = await response.json()
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
                const data = await response.json()
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
        const { name } = repoData
        return <div className='repository-success-view'>
            <h1>{name}</h1>
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
            {renderContent()}
        </div>
    )
}

export default RepositoriesDetails