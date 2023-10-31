import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Attachee from './Components/Attachee'
import Category from './Components/Category'
import Profile from './Components/Profile'
import AddCategory from './Components/AddCategory'
import AddAttachee from './Components/AddAttachee'
import EditAttachee from './Components/EditAttachee'
import Start from './Components/Start'
import AttacheeLogin from './Components/AttacheeLogin'
import AttacheeDetail from './Components/AttacheeDetail'
import PrivateRoute from './Components/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Start />}></Route>
      <Route path='/adminlogin' element={<Login />}></Route>
      <Route path='/attachee_login' element={<AttacheeLogin />}></Route>
      <Route path='/attachee_detail/:id' element={<AttacheeDetail />}></Route>
      <Route path='/dashboard' element={
        <PrivateRoute >
          <Dashboard />
        </PrivateRoute>
      }>
        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/attachee' element={<Attachee />}></Route>
        <Route path='/dashboard/category' element={<Category />}></Route>
        <Route path='/dashboard/profile' element={<Profile />}></Route>
        <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
        <Route path='/dashboard/add_attachee' element={<AddAttachee />}></Route>
        <Route path='/dashboard/edit_attachee/:id' element={<EditAttachee />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
