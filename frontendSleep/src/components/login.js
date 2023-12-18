// Import the react JS packages 
import axios from "axios";
import {useState} from "react";

// Define the Login function.
export function Login() {
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const [wrongInfo, setWrongInfo] = useState(false)
     // Create the submit method.
     const submit = async e => {
          e.preventDefault();
          const user = {
                username: username,
                password: password
               };
          // Create the POST requuest
          const {data} = await                                                                            
                         axios.post('http://localhost:8000/token/',
                         user, {headers: {'Content-Type': 'application/json'}},
                         {withCredentials: true})
          if(data == null) {
            // if user gives wrong login credentials, don't log in
            setWrongInfo(true)
            return;
          }
          
         // Initialize the access & refresh token in localstorage.      
         localStorage.clear();
         localStorage.setItem('access_token', data.access);
         localStorage.setItem('refresh_token', data.refresh);
         localStorage.setItem('username', username);
         axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
         window.location.href = '/'
    }
    return(
      <div className="Auth-form-container" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '60vh'}}>
        <form className="Auth-form" style={{borderRadius: "10%", boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}} onSubmit={submit}>
          <div className="Auth-form-content" style={{padding: "40px"}}>
            <h3 className="Auth-form-title">Sign In</h3>
            {wrongInfo ? <h3 style={{color:"red"}}>Wrong Email or Password</h3>: null}
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
              <label>Password</label>
              <input name='password' 
                type="password"     
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                required
                onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" 
                 className="btn btn-info">Submit</button>
            </div>
            <div className="d-grid gap-2 mt-3">
              <a href="/register"
                 className="btn">Don't have an account? Register</a>
            </div>
          </div>
       </form>
     </div>
     )
}
