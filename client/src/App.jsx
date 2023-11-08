
import { Routes, Route} from "react-router-dom"
import axios from "axios"
import IndexPage from './pages/IndexPage'
import LogingPage from './pages/LogingPage'
import Layout from './components/Layout'
import RegisterPage from './components/RegisterPage'
import { UserContextProvider } from './usercontext'
import PlacesPages from "./pages/PlacesPages"
import PlacesFormPage from "./pages/PlacesFormPage"
import ProfilePage from "./pages/ProfilePage"
import Placepage from "./pages/Placepage"
import BookingsPages from "./pages/BookingsPages"
import BookingPage from "./pages/BookingPage"


axios.defaults.baseURL = "http://localhost:8080"
axios.defaults.withCredentials = true

function App() {
  return(
  <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<IndexPage />}/>
        <Route path="/login" element={<LogingPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/account" element={<ProfilePage />}/>
        <Route path="/account/places" element={<PlacesPages />}/>
        <Route path="/account/places/new" element={<PlacesFormPage />}/>
        <Route path="/account/places/:id" element={<PlacesFormPage />} />
        <Route path="place/:id" element ={<Placepage />}/>
        <Route path="/account/bookings" element ={<BookingsPages />}/>
        <Route path="/account/bookings/:id" element ={<BookingPage />}/>
      </Route>
    </Routes>
  </UserContextProvider>
  )
  
}

export default App
