import { useState,useEffect } from 'react'
import Header from './Header'
import AddCard from './AddCard'
import Button from './Button'
import ViewCards from './ViewCards'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert'

const MyCred = () => {
  
  //const name = "User 1";
  const [user,setUser] = useState('');
  const [data,setData] = useState([]);

  const [ showAddCard, setShowAddCard ] = useState(false)
  const [ showViewCards, setShowViewCards ] = useState(false)
  
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
    return <Redirect to="/login"/>;
  }

   return (
    <div className="container-fluid">
      <Button color="red"  
          text="Sign Out" 
          onClick={() => {
            localStorage.removeItem('token');
            setAuthenticated(false);
          }}
      />

      <Header user={user} />

      <div className="outline">
        
        <Button 
          color={showAddCard ? "red" : "green"} 
          text={showAddCard ? "Close" : "Add New Card"} 
          onClick={() => setShowAddCard(!showAddCard) }
        />

        { showAddCard && <AddCard onAdd={addCard} /> }
          
        {
          data.length > 0
            &&
          <Button 
            color={showViewCards ? "red" : "green"} 
            text={showViewCards ? "Close" : "View Card"} 
            onClick={() => setShowViewCards(!showViewCards) }
          />
        }

        { showViewCards && <ViewCards cards={data} payBill={payBill}/>}
      
      </div>
    </div>
  );
}

export default MyCred;
