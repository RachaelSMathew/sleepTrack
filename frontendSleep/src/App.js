import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Login} from "./components/login";
import {Home} from "./components/Home";
import {Navigation} from './components/navigation';
import {Logout} from './components/logout';
import { Register } from './components/register';

function App() {
    return (
      <BrowserRouter>
        <Navigation></Navigation>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    )
}
export default App;