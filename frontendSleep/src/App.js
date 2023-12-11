import logo from './logo.svg';
import './App.css';
import Home from "./components/Home";
import {BrowserRouter, Route, Routes} from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route exact path="/" element={<Home/>} /> 
       </Routes>
    </BrowserRouter>
  );
}

export default App;
