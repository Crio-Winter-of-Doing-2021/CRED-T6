import React, { Fragment, useState,useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
  
    const { email, password } = formData;
    const [authenticated, setAuthenticated] = useState(false);
    const onChange = e =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
  
    const onSubmit = async(e) => {
      e.preventDefault();
     // login(email, password);
     const User = {
        email,
        password
    };
    try{
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify(User);

        const res = await axios.post('/auth',body, config);
        localStorage.setItem('token', res.data.token);
        console.log(res.data);
        setAuthenticated(true);
    }
    catch(err){
        console.error(err.response.data);
    }
    };
  
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
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user" /> Sign Into Your Account
        </p>
        <form className="form" onSubmit={onSubmit}>
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
              minLength="6"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </Fragment>
    );
  };

export default Login;