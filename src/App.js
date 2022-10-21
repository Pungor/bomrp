import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'


//styles
import './App.css';

//pages, components
import Login from './pages/Login'
import Home from './pages/Home'


function App() {
  return (
    <div className="App">

      <BrowserRouter>
          
          <Routes>

          <Route path="/" element ={<Home/>}/>
          <Route path="/login" element ={<Login/>}/>

           
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
