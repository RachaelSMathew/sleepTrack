// Import the react JS packages 
import axios from "axios";
import {useState} from "react";

// Define the Login function.
export function Register() {
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const [email, setEmail] = useState('');
     const [confirmPass, setConfirmPass] = useState('');
     // Create the submit method.
     const submit = async e => {
          e.preventDefault();
          const user = {
                username: username,
                password: password,
                email: email
               };
          // Create the POST requuest
          const {data} = await                                                                            
                         axios.post('http://localhost:8000/register/',
                         user, {headers: {'Content-Type': 'application/json'}},
                         {withCredentials: true});

         // Initialize the access & refresh token in localstorage.      
         localStorage.clear();
         localStorage.setItem('access_token', data.access);
         localStorage.setItem('refresh_token', data.refresh);
         localStorage.setItem('username', username);
         axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
         window.location.href = '/'
    }
    return(
      <div className="Auth-form-container" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '70vh'}}>
        <form className="Auth-form" onSubmit={submit}>
          <div className="Auth-form-content" style={{padding: "40px"}}>
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="form-group mt-3">
              <label>Username</label>
              <input className="form-control mt-1" 
                placeholder="Enter Username" 
                name='username'  
                type='text' value={username}
                required 
                onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input className="form-control mt-1" 
                placeholder="Enter Username" 
                name='username'  
                type='text' value={email}
                required 
                onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input className="form-control mt-1" 
                placeholder="Enter Username" 
                name='username'  
                type='text' value={password}
                required 
                onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="form-group mt-3">
              <label>Confirm Password</label>
              <input name='password' 
                type="password"     
                className="form-control mt-1"
                placeholder="Enter password"
                value={confirmPass}
                required
                onChange={e => setConfirmPass(e.target.value)}/>
            </div>
            <div className="d-grid gap-2 mt-3">
              {/***Going to figure out a cleaner way to do this, but if password not equal, can't sign in */}
              {confirmPass !== password ?
                <button type="submit" disabled
                 className="btn btn-info">Sign Up!</button>
                 :
                 <button type="submit"
                 className="btn btn-info">Sign Up!</button>
              }
            </div>
            <div className="d-grid" style={{marginTop:1+"em"}}>
              <a href="/login"
                 className="btn">Go back to Login</a>
            </div>
          </div>
       </form>
     </div>
     )
}