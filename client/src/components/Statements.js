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
                  <th>{"Amount"}</th>
                  <th>{"Vendor"}</th>
                  <th>{"Type"}</th>
                  <th>{"Category"}</th>
                  <th>{"Date"}</th>
                </tr>
              </thead>
              <tbody>
                {props.transactions.map((data, idx) => (
                    <tr key={idx}>
                      <th scope="row">{idx+1}</th>
                      <td>{Math.abs(data.amount)}</td>
                      <td>{data.vendor}</td>
                      <td>{data.type}</td>
                      <td>{data.category} </td>
                      <td>{data.date} </td>
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