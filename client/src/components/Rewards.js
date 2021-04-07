import React, {useState, useEffect} from 'react';
import ScratchCard from 'react-scratchcard';
import { Spinner } from 'reactstrap';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import swal from 'sweetalert';

import { Container, Row, Col } from 'reactstrap';

 

const Rewards = () =>
 {
  const [loading, setLoading] = useState(true);
  //const [user,setUser] = useState({});
  
  const [credCoins,setCredCoins] = useState(0);
  const [rewards,setRewards] = useState([]);
  const [unclaimed,setUnclaimed] = useState([]);
 
  const [modal, setModal] = useState(false);
  const [value,setValue] = useState(0);
  const toggle = () => setModal(!modal);
  const settings = {
    width: 150,
    height: 150,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfGmACn3ZR9FtJ-qFahvRr9--vgMLD0V7kkQ&usqp=CAU',
    finishPercent: 60,
    onComplete: async () => {
      const curr = Math.floor(Math.random() * 100 + 1);
      setValue(curr);
      try{
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({amount:curr});

        const res = await axios.put('/rewards/claim',body, config);
        //localStorage.setItem('token', res.data.token);
        console.log(res.data);
        //setAuthenticated(true);
        setTimeout(() => swal({
          title: "Reward Claimed!",
          icon: "success",
        }),300);
        

        setTimeout(() => window.location.reload(false),1000);

    }
    catch(err){
        console.error(err.response.data);
    }
      
    }
  };
  const getUser = async () =>{
    try{
      axios.defaults.headers.common['x-auth-token'] = localStorage.token;
      const res = await axios.get('/auth');
      console.log(res);
      setCredCoins(res.data.credCoins);
      setUnclaimed(res.data.unclaimedRewards);
      setRewards(res.data.rewards);

      return;
  }
  catch(err){
      console.log(err);
      //setAuthenticated(false);
      return;
  }
  }
 
 
  useEffect(()=>{
   getUser();
   //console.log(rewards);
   setLoading(false);
 },[])


  return(
    <div>
      <Button color="danger" onClick={toggle}>My Rewards</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}><h2>Cred Coins: {credCoins}</h2></ModalHeader>
        <ModalBody style={{paddingRight:'2rem'}}>
        <Container>
          <Row>
        
        {loading?<div><Spinner color="warning" /></div>:
        unclaimed.map(()=>(<Col xs="6" sm="4"><div className="reward" 
        style={{height:'150px',
        width:'150px',marginBottom:'15px'}}><ScratchCard {...settings}>
              <h6 style={{paddingLeft:'20px'}}>Congratulations!</h6> 
              <h6 style={{paddingLeft:'20px'}}>You Won</h6>
              <h1 style={{paddingLeft:'20px'}}>{value} Cred Coins!</h1>
             </ScratchCard></div></Col>))
        }
        
        </Row>
        <h3>Claimed Rewards:</h3>
        <Row>
        {loading?<div><Spinner color="warning" /></div>:
        rewards.map((e)=>(<Col xs="6" sm="4"><div className="reward" 
        style={{height:'150px',
        width:'150px',marginBottom:'15px'}}>
              <h6 style={{paddingLeft:'20px'}}>Congratulations!</h6> 
              <h6 style={{paddingLeft:'20px'}}>You Won</h6>
              <h1 style={{paddingLeft:'20px'}}>{e} Cred Coins!</h1>
             </div></Col>))
        }
      
        </Row>
        </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
  </div>
  )
 }
export default Rewards;