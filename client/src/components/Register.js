import React,{Fragment, useState, useEffect} from 'react'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

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
      <Fragment>
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
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={onChange}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </Fragment>
    );
  };

export default Register;