import axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap'

const Bill = (props) => {

  const [modal, setModal] = useState(false);
  const [amount, setAmount ] = useState('');

  const toggle = () => setModal(!modal);

  const onSubmit = async () => {
      if(amount>props.amount)
      {
        alert('Enter amount is more than net amount');
      }
      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
      const payment = {card:props.card, amount:amount*(-1),vendor:"-",type:"Bill payment",category:"Debit",date:today.toDateString()}
      console.log(payment);
    try{
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify(payment);

        const res = await axios.post('/transactions/pay',body, config);
        //localStorage.setItem('token', res.data.token);
        console.log(res.data);
        //setAuthenticated(true);
        toggle()
        props.payBill({amount})
    }
    catch(err){
        console.error(err.response.data);
    }
      
  }

  return (
    <div>
      <Button color="primary" onClick={toggle}><strong>{props.text}</strong></Button>
      <Modal isOpen={modal} toggle={toggle} fullscreen="lg" size="md">
        <ModalHeader toggle={toggle}>Pay Bill</ModalHeader>
        <ModalBody>
            <strong>Net Amount: {props.amount}</strong>

            {
              props.amount>=0 
              
                &&

              <Form onSubmit={onSubmit}>

                  <FormGroup>
                      <Label>Amount</Label>
                      <Input type="number" placeholder="Add Amount"  value={amount} onChange={(event) => setAmount(event.target.value)} />
                      <FormText color="muted">
                          Enter the bill amount which want to pay
                      </FormText>
                  </FormGroup>

                  <Button>Pay</Button>
              </Form>
            }

        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Bill;