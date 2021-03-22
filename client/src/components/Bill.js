import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap'

const Bill = (props) => {

  const [modal, setModal] = useState(false);
  const [amount, setAmount ] = useState('');

  const toggle = () => setModal(!modal);

  const onSubmit = () => {
      toggle()
      props.payBill({amount})
  }

  return (
    <div>
      <Button color="primary" onClick={toggle}><strong>{props.text}</strong></Button>
      <Modal isOpen={modal} toggle={toggle} fullscreen="lg" size="md">
        <ModalHeader toggle={toggle}>Pay Bill</ModalHeader>
        <ModalBody>
            <strong>Net Amount: {props.amount}</strong>

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
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Bill;