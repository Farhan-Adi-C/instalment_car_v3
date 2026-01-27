
import "./assets/css/bootstrap.css";
import "./assets/css/custom.css";
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import FormValidation from './pages/FormValidation';
import Instalment from './pages/InstalmentPage';
import DetailInstalment from './pages/DetailInstalment';
import LoginAdmin from './pages/admin/LoginAdmin';
import DashboardAdmin from "./pages/admin/DashboardAdmin";

 
function App() {
 

  return (
    <>
     <Routes>
      <Route path='/login' element={<LoginPage />}></Route>
      <Route path='/' element={<DashboardPage />}></Route>
      <Route path='/form-validation' element={<FormValidation />}></Route>
      <Route path='/instalment-car' element={<Instalment />}></Route>
      <Route path='/instalment-car/:id' element={<DetailInstalment />}></Route>

      <Route path='/admin/login' element={<LoginAdmin/>}></Route>
      <Route path='/admin' element={<DashboardAdmin/>}></Route>

     </Routes>
    </>
  )
}

export default App
