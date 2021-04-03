import React,{useState, useEffect} from 'react'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
const Register = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password2: ''
    });
    const { name, email, password, password2 } = formData;
    
    const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const onSubmit = async (e) => {
      e.preventDefault();
      if(password !== password2) {
       // setAlert('Passwords do not match', 'danger');
       console.log('Passwords do not match');
       swal({
        text: `Passwords do not match`,
        icon: "warning"
      });
        } else {
         const newUser = {
             name,
             email,
             password
         };
         try{
             const config = {
                 headers:{
                     'Content-Type': 'application/json'
                 }
             };

             const body = JSON.stringify(newUser);

             const res = await axios.post('/users',body, config);
             localStorage.setItem('token', res.data.token);
             console.log(res.data);
             setAuthenticated(true);
         }
         catch(err){
             console.error(err.response.data);
             swal({
              text: `${err.response.data.errors[0].msg}`,
              icon: "error"
            });
         }
      }
    };
    const [authenticated, setAuthenticated] = useState(false);

    

    const loggedIn = async () =>{
        //const token = localStorage.getItem('token');
        console.log(authenticated);
        if(!localStorage.token)
        {
            //console.log('ff')
            return;
        }
        //return 0;
        //console.log(localStorage.token);
        axios.defaults.headers.common['x-auth-token'] = localStorage.token;

        try{
            const res = await axios.get('/auth');
            console.log(res);
            setAuthenticated(true);
            //return true;
            return;
        }
        catch(err){
            console.log(err);
            return;
        }
    }
    
    useEffect(()=>{
      loggedIn();
    })
    
    if (authenticated) {
      return <Redirect to="/mycred" />;
    }
  
    return (
      <div className='container-fluid' style = {{
        paddingTop:'20vh',
        paddingLeft:'10vw',
        paddingRight:'10vw',
      }}>

        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user" /> Create Your Account
        </p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={onChange}
              required
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login" >Sign In</Link>
        </p>
      </div>
    );
  };

export default Register;