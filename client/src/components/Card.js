import Statements from './Statements'
import Bill from './Bill'
import { Container, Row, Col } from 'reactstrap';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Cards from 'react-credit-cards';
import {Button} from 'reactstrap'
const Card = ({ card, payBill }) => {

    const [transactions,setTransactions] = useState([]);
    const [amount, setAmount] = useState(0);

    const getTransactions = async () =>{

        try{
            const res = await axios.get(`/transactions/${card._id}`);
            //setData(res.data)
            console.log(res);
            setTransactions(res.data);
            let x = 0;
            
            res.data.map((i)=>{
                x+=i.amount;
            });
            
            setAmount(x);
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
        console.log(amount);
        //getAmount();
    },[])  
      
    return (
        <div className="card">
            
            <Container>
                <Row>
                    <Col>
                        <Cards 
                            number={card.cardNumber}
                            name={card.name}
                            expiry={card.expiryDate}
                        />
                    </Col>
                </Row>
                <Row>
                {amount?
                    <Col style={{paddingLeft:'35%', fontSize:'20px'}}>
                    <b>Amount: {amount}</b>
                </Col>
                    :<Col style={{paddingLeft:'40%', fontSize:'20px'}}>
                    <b>Bill Paid!</b>
                </Col>}
                    
                </Row>
                <Row>
                    <Col>
                        <Statements text={"View Statement"} transactions={transactions} amount={amount}/> 
                    </Col>
                    <Col>
                        {amount?<Bill text={"Pay Bill"} amount={amount} payBill={payBill} card={card._id}/>:<Button disabled>Pay Bill</Button>}
                    </Col>
                </Row>
            </Container>
        

        </div>
    )
}

export default Card