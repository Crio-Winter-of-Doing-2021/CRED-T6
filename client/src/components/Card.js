import Statements from './Statements'
import Bill from './Bill'
import { Container, Row, Col } from 'reactstrap';
import { useState,useEffect } from 'react'
import axios from 'axios';

const Card = ({ card, payBill }) => {
    const [transactions,setTransactions] = useState([]);
    const getTransactions = async (card) =>{
        try{
          const res = await axios.get(`/transactions/${card}`);
          //setData(res.data)
          console.log(res);
          setTransactions(res.data);
          return;
      }
      catch(err){
          console.log(err);
          //setAuthenticated(false);
          return;
      }
      }
      useEffect(()=>{
        //();
        getTransactions();
    },[])    
    return (
        <div className="card">
            <h3>
            <Container>
                <Row>
                    {card.cardNumber} 
                </Row>
                <Row>
                <Col> {card.expiryDate} </Col>    
                <Col> {card.name} </Col>    
                </Row>
                <Row>
                    {card.amount}
                </Row>  
            </Container>
            </h3>
            <Statements text={"View Statement"} transactions={transactions} amount={card.amount}/> 
            <Bill text={"Pay Bill"} amount={card.amount} payBill={payBill} />
            
            
        
        </div>
    )
}

export default Card
