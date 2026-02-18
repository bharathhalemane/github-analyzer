import './RepoCard.css'
import { FaStar, FaEye, } from "react-icons/fa";
import { PiGitBranchBold } from "react-icons/pi";
import {Link} from "react-router-dom"

const RepoCard = ({ data }) => {
    const { name, htmlUrl, description, topics, stargazersCount, forksCount, watchersCount } = data
    const colorClassNames = ["color-pink", 'color-green', 'color-blue', 'color-red', 'color-yellow']
    return <Link className='link' to={`/repositories/${name}`}>
        <div className='repoCard-container'>
            <h1 className="repo-name"><a href={htmlUrl} target='_blank'>{name}</a></h1>
            <p className='repo-description'>{description}</p>
            <ul className='topics-list'>
                {
                    topics.map((topic, index) => (
                        <li className={`${colorClassNames[index % colorClassNames.length]} topics`}>{topic}</li>
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
        </div>
    </Link>
}

export default RepoCard