import React from 'react'
import NavBar from './NavBar';
import { Jumbotron, Button } from 'reactstrap';
import {Link} from 'react-router-dom'
const Landing = () => {
return (
<div className='container-fluid' style = {{minHeight:'100vh',backgroundColor:'black',paddingBottom:'0%'}}>
        <NavBar/>
        <Jumbotron style = {{marginTop:'7vh',marginLeft:'10vw',marginRight:'10vw',width:'80vw'}}>
                <div style = {{display: 'flex',justifyContent:'center'}}>
                <div><p className="display-3">CRED</p></div>
                </div>

                <div style = {{display: 'flex',justifyContent:'center'}}>
                <div><h6 className="display-4">Credit Card Bill Payment Made Easy!</h6></div>
                </div>
        
        
        <hr className="my-2" />

        <div style = {{display: 'flex',justifyContent:'center'}}>
                <div><h1 className="display-5">Join Us Now!!</h1></div>
        </div>
        
        <div style = {{display: 'flex',justifyContent:'space-evenly',paddingBottom:'0%'}}>
                <div> <Link to = '/login'>
          <Button>Sign In</Button>
        </Link></div>
        <div>
        <Link to = '/register'>
          <Button >Sign Up</Button>
        </Link></div>
                </div>
       
        
      </Jumbotron>
</div>
)
}

export default Landing;
