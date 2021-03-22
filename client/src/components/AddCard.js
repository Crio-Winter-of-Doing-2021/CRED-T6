import { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Container, Row, Col} from 'reactstrap';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import axios from 'axios';
const AddCard = ({ onAdd }) => {

    const [cardNo, setCardNo] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [name, setName] = useState('');
    const [cvc, setCvc] = useState('');
    const [focus, setFocus] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        if(!cardNo || !expiryDate || !name || !cvc) {
            alert("Please complete all the fields")
            return 
        }
        const newCard = {
            cardNumber : cardNo,
            expiryDate,
            name,
            cvc,
            amount:0
        };
        try{
            const config = {
                headers:{
                    'Content-Type': 'application/json'
                }
            };

            const body = JSON.stringify(newCard);

            const res = await axios.post('/cards',body, config);
            //.setItem('token', res.data.token);
            console.log(res.data);
            //setAuthenticated(true);
        }
        catch(err){
            console.error(err.response.data);
        }
        //alert("Card Added");
        onAdd({cardNo, expiryDate, name})

        setCardNo('');
        setExpiryDate('');
        setName('');
        setCvc('');
        setFocus('');
    }

    return (
        <>
        <Cards 
            number={cardNo}
            name={name}
            expiry={expiryDate}
            cvc={cvc}
            focused={focus}
        />


        <Form onSubmit={onSubmit}>
        <Container>

            <Row>
                <Col>
                    <FormGroup>
                        <Label>Card Number</Label>
                        <Input 
                            type="tel" 
                            name="cardNo"
                            placeholder="Card Number"  
                            value={cardNo} 
                            onChange={(event) => setCardNo(event.target.value)} 
                            onFocus={(event) => setFocus(event.target.name)}
                        />
                </FormGroup>
                </Col>
            </Row>
        
            <Row>
                <Col>
                    <FormGroup>
                        <Label>Name</Label>
                        <Input 
                            type="text" 
                            name="name"
                            placeholder="Name" 
                            value={name} 
                            onChange={(event) => setName(event.target.value)} 
                            onFocus={(event) => setFocus(event.target.name)}
                        />
                    </FormGroup>
                </Col>
            </Row>
        
            <Row>
                <Col>
                    <FormGroup>
                        <Label>Expiry Date</Label>
                        <Input 
                            type="text" 
                            name="expiryDate"
                            placeholder="MM/YY Expiry" 
                            value={expiryDate} 
                            onChange={(event) => setExpiryDate(event.target.value)} 
                            onFocus={(event) => setFocus(event.target.name)}
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label>CVC</Label>
                        <Input 
                            type="tel" 
                            name="cvc"
                            placeholder="CVC" 
                            value={cvc} 
                            onChange={(event) => setCvc(event.target.value)} 
                            onFocus={(event) => setFocus(event.target.name)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button  block>Add Card</Button>
                </Col>
            </Row>
        </Container>
    </Form>   
    </>
    )
}

export default AddCard

