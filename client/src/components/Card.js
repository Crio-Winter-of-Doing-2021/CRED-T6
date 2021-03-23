import Statements from './Statements'
import Bill from './Bill'
import { Container, Row, Col } from 'reactstrap';
import { useState,useEffect } from 'react'
import axios from 'axios';
import Cards from 'react-credit-cards';

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
            
            <Container>
                <Row>
                        <Cards 
                            number={card.cardNumber}
                            name={card.name}
                            expiry={card.expiryDate}
                        />
        
                </Row>
                <Row>
                    <Col>
                        Amount: {card.amount}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Statements text={"View Statement"} transactions={transactions} amount={card.amount}/> 
                    </Col>
                    <Col>
                        <Bill text={"Pay Bill"} amount={card.amount} payBill={payBill} />
                    </Col>
                </Row>
            </Container>
        

        </div>
    )
}

// Col not working for Bill & Statement

export default Card
