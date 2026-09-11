import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './Navbar'
import Home from './pages/Home'
import NewForm from './pages/NewForm'
import ShowUser from './pages/ShowUser'
import EditForm from './pages/EditForm'

function App() {

  return (
    <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/new" element={<NewForm />} />

                <Route path="/user/:id" element={<ShowUser />} />

                <Route path="/user/:id/edit" element={<EditForm />} />

            </Routes>

        </BrowserRouter>
  )
}

export default App
