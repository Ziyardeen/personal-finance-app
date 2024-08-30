import Home from './components/Home'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Display from './components/Display'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/display" element={<Display />} />
            </Routes>
        </>
    )
}

export default App
