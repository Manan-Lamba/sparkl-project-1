import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './Navbar'
import Home from './pages/Home'
import NewForm from './pages/NewForm'
import ShowUser from './pages/ShowUser'
import EditForm from './pages/EditForm'
import UserDetails from './pages/UserDetails'
import ShowUserDetails from './pages/ShowUserDetails'
import UserDetailsForm from './pages/UserDetailsForm'
import EditUserDetails from "./pages/EditUserDetails";

function App() {

  return (
    <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/new" element={<NewForm />} />

                <Route path="/user/:id" element={<ShowUser />} />

                <Route path="/user/:id/edit" element={<EditForm />} />

                <Route path="/users/details" element={<UserDetails />} />

                <Route path="/users/:id/details" element={<ShowUserDetails />} />

                <Route path="/users/:id/details/new" element={<UserDetailsForm />} />

                <Route path="/users/:id/details/edit" element={<EditUserDetails />} />

            </Routes>

        </BrowserRouter>
  )
}

export default App
