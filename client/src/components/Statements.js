import React, { useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

const Statements = (props) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  
  return (
    <div>
      <Button color="primary" onClick={toggle}><strong>{props.text}</strong></Button>
      <Modal isOpen={modal} toggle={toggle} fullscreen="lg" size="lg">

        <ModalHeader toggle={toggle}>Transactions</ModalHeader>
        <ModalBody>
          
            <Table responsive striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>{"Date"}</th>
                  <th>{"Vendor"}</th>
                  <th>{"Category"}</th>
                  <th>{"Type"}</th>
                  <th>{"Amount"}</th>
                  
                </tr>
              </thead>
              <tbody>
                {props.transactions.map((data, idx) => (
                    <tr key={idx}>
                      <th scope="row">{idx+1}</th>
                      <td>{data.date} </td>
                      <td>{data.vendor}</td>
                      <td style={ data.amount > 0 ? {color:"red"} : {color:"green"}}>{data.category} </td>
                      <td>{data.type}</td>
                      <td style={ data.amount > 0 ? {color:"red"} : {color:"green"}}>₹{Math.abs(data.amount)}</td>
                    </tr>
                ))}
                
              </tbody>
            </Table>
            <strong>Net Amount: {props.amount}</strong>
          
        </ModalBody>
        <ModalFooter>
          <Button  color="secondary" onClick={toggle}>Ok</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}


export default Statements;