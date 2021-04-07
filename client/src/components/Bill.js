import axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import swal from 'sweetalert';


const Bill = (props) => {

  const [modal, setModal] = useState(false);
  const [amount, setAmount ] = useState('');

  const toggle = () => setModal(!modal);
  

  function formatDate(date, format) {
    const map = {
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        yy: date.getFullYear().toString().slice(-2),
        yyyy: date.getFullYear()
    }

    return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched])
} 
  const onSubmit = async (event) => {

      event.preventDefault();
      if(amount > props.amount) {
        swal({
          text: 'Entered amount is more than net amount',
          icon: "warning"
        });
        return;
      }
     
      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
      const payment = {card:props.card, amount:amount*(-1),vendor:"Self",type:"Bill payment",category:"Credit",date:formatDate(today,'dd/mm/yy')}
      console.log(payment);
      //return;
    try{
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify(payment);

        const res = await axios.post('/transactions/pay',body, config);
        //localStorage.setItem('token', res.data.token);
        //console.log(res.data);
        //setAuthenticated(true);
         const res2 = await axios.put('/rewards');
         console.log(res2);
        swal({
          title: "Bill Paid!",
          text: "Congratulations! You have earned a Scratch Card!!",
          icon: "success",
        });

        setTimeout(() => window.location.reload(false),1000);

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
              props.amount>0 
              
                &&

              <Form onSubmit={onSubmit}>

                  <FormGroup>
                      <Label>Amount</Label>
                      <Input type="number" placeholder="Add Amount"  value={amount} onChange={(event) => setAmount(event.target.value)} required/>
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