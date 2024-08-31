import Home from './components/Home'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Display from './components/Display'

import Chartistics from './components/Chartistics'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/display" element={<Display />} />
                <Route path="/charts" element={<Chartistics />} />
            </Routes>
        </>
    )
}

export default App
