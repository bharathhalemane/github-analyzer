import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './components/Pages/Home/Home'
import Repositories from './components/Pages/Repositories/Repositories'
import RepositoriesDetails from './components/Pages/RepositoriesDetails/RepositoriesDetails'
import NotFound from './components/Pages/NotFound/NotFound'
import { useState } from 'react'
import Analysis from './components/Pages/Analysis/Analysis'

function App() {
  const [username, setUsername] = useState("")
  return (
    <Router>      
      <Routes>
        <Route path="/" element={<Home setUsername={setUsername} username={username} />} />
        <Route path="/repositories" element={<Repositories username={username} />} />
        <Route path="/analysis" element={<Analysis username={username} />} />
        <Route path="/repositories/:repoName" element={<RepositoriesDetails username={username} />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace/>} />
      </Routes>
  </Router>
)
  
}

export default App
