import { useState,useEffect } from 'react'
import Header from './Header'
import AddCard from './AddCard'
import Button from './Button'
import ViewCards from './ViewCards'
import { Redirect } from 'react-router-dom';
import cred from '../img/cred.jpg';
import axios from 'axios';
import swal from 'sweetalert';
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
const MyCred = () => {
  
  //const name = "User 1";
  const [user,setUser] = useState('');
  const [data,setData] = useState([]);
 
  const [modal, setModal] = useState(false);

  const toggle2 = () => setModal(!modal);


  const [ showAddCard, setShowAddCard ] = useState(false)
  
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const [authenticated, setAuthenticated] = useState(true);

    const loggedIn = async () =>{
        //const token = localStorage.getItem('token');
        //console.log(authenticated);
        if(!localStorage.token)
        {
            //console.log('ff')
            setAuthenticated(false);
            return;
        }
        //return 0;
        //console.log(localStorage.token);
        axios.defaults.headers.common['x-auth-token'] = localStorage.token;

        try{
            const res = await axios.get('/auth');
            setUser(res.data.name)
            //console.log(res);
            //return true;
            return;
        }
        catch(err){
            console.log(err);
            setAuthenticated(false);
            return;
        }
    }
    
    //loggedIn();
    
  const getCards = async () =>{
    try{
      const res = await axios.get('/cards');
      //console.log(res1);
      setData(res.data);
      return;
  }
  catch(err){
      console.log(err);
      //setAuthenticated(false);
      return;
  }
  }
  
  
  const addCard = (event) => {
    console.log(event);
    swal({
      title: "Card Added!",
      icon: "success"
  });
    setShowAddCard(!showAddCard)
    setTimeout(() => window.location.reload(false) ,1000);
  }

  const payBill = (event) => {
    console.log(event);
  }
  
  useEffect(()=>{
      loggedIn();
      getCards();
  },[])
  
  

  if (!authenticated) {
    //console.log('sadfdaf')
    return <Redirect to="/"/>;
  }

   return (
    <div className="container-fluid" >
      <Navbar color="warning" light expand="md">
      <NavbarBrand style={{display:'flex'}}><img src={cred} className="logo"/><h1 style={{fontFamily: "'Monoton', cursive"}}>CRED</h1></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-left" navbar style={{marginLeft:'50vw'}}>
            <NavItem>
      <Button color="danger" text = "Add Card" onClick={toggle2}/>
      <Modal isOpen={modal} toggle={toggle2}>
        <ModalHeader toggle={toggle2}>Enter Your Card Details</ModalHeader>
        <ModalBody>
        <AddCard onAdd={addCard}/>
          </ModalBody>

      </Modal>
            </NavItem>
            <NavItem>
              <Button  
          text="Sign Out" 
          onClick={() => {
            localStorage.removeItem('token');
            setAuthenticated(false);
          }}
      />
            </NavItem>
          </Nav>
          </Collapse>
      </Navbar>
      

      <Header user={user} />

      <div className="outline" style={{minHeight:'90vh'}}>
        
        
          
        {
          data.length > 0 ? <ViewCards cards={data} payBill={payBill}/> : <div style={{display:'flex',justifyContent:'center',color:'#e8ba13'}}><h1>No Card to show! Please add a card!</h1></div>
        }

         
      
      </div>
    </div>
  );
}

export default MyCred;