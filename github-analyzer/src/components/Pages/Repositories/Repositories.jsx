//url:- https://api.github.com/users/${username}/repos
import Header from '../../utils/Header/Header'
import { useState, useEffect } from "react"
import { Octokit } from "@octokit/rest"
import RepoCard from '../../utils/RepoCard/RepoCard'
import { TailSpin } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import './Repositories.css'

const apiProgress = {
    success: "SUCCESS",
    failure: "FAILURE",
    loading: "LOADING"
}

const token = import.meta.env.VITE_GITHUB_TOKEN

const Repositories = ({ username }) => {
    const [reposData, setReposData] = useState([])
    const [progress, setProgress] = useState(apiProgress.loading)
    const octokit = new Octokit()

    const formattedData = data => {
        return {
            id: data.id,
            forksCount: data.forks_count,
            name: data.name,
            htmlUrl: data.html_url,
            stargazersCount: data.stargazers_count,
            topics: data.topics,
            watchersCount: data.watchers_count,
            description: data.description
        }
    }

    const getReposData = async () => {
        try {
            setProgress(apiProgress.loading)
            const response = await octokit.request('GET /users/{username}/repos', {
                username: username,
                auth: token
            })
            if (response.status === 200) {
                const data = response.data.map(each => formattedData(each))
                setReposData(data)
                setProgress(apiProgress.success)
            } else {
                setProgress(apiProgress.failure)
            }
        } catch (err) {
            setProgress(apiProgress.failure)
        }
    }

    useEffect(() => {
        if (!username) {
            return setProgress(apiProgress.failure)
        }
        getReposData()
    }, [])

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
        return <div className='success-view'>
            {
                reposData.length > 0 ? <>
                    <h1 className='heading'>Repositories</h1>
                    <ul className='repos-list-container'>
                        {
                            reposData.map(repo => (
                                <li key={repo.id}>
                                    <RepoCard data={repo} />
                                </li>
                            ))
                        }
                    </ul></> : <div className='no-repos-data'>
                    <img src="https://res.cloudinary.com/dfomcgwro/image/upload/v1771441453/Layer_3_ctljs4.png" alt="no data" />
                    <h1>No Repositories Found</h1>
                </div>
            }
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
                return loader()
            case apiProgress.success:
                return successView()
            case apiProgress.failure:
                return failureView()
        }
    }

    return (
        <div>
            <Header activeId="repositories" />
            {renderContent()}
        </div>
    )
}

export default Repositories