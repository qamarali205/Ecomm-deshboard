
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import SignUP from './components/SignUP';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<PrivateComponent />}>
        <Route path='/' element={<h1>Product List components</h1>} />
        <Route path='/add' element={<AddProduct />} />
        <Route path='/update' element={<h1>Update Products components</h1>} />
        <Route path='/logout' element={<h1>Logout components</h1>} />
        <Route path='/profile' element={<h1>profile components</h1>} />
        </Route>
        <Route path='/signup' element={<SignUP />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      
      </BrowserRouter>
      <Footer />   
    </div>
  );
}

export default App;
