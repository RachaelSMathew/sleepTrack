import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect} from 'react';
import "./login.css"

export function Navigation() {
   const [isAuth, setIsAuth] = useState(false);
   
   useEffect(() => {
     if (localStorage.getItem('username') !== null) {
        setIsAuth(true); 
        document.body.className = ""
      } else {
        document.body.className = "login-background"
      }
    }, []);
     return ( 
      <div>
        <Navbar bg="transparent">
          <Nav className='mx-auto'>
            {isAuth ? null : <Navbar.Brand href="">
              <h2 style={{marginTop: 1+"em"}}>Sleep Tracking App</h2>
              <br></br>
              <h5><center>by rachael mathew</center></h5>
              </Navbar.Brand> }
          </Nav>      
          <Nav className='navbar-nav ml-auto'>
          {isAuth ? <Nav.Link href="/logout"><h4 style={{marginRight: 1+"em"}}>Logout</h4></Nav.Link> :  null}
          </Nav>
        </Navbar>
       </div>
     );
}