import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import ReactPaginate from "react-paginate";

const Statements = (props) =>{
  const transactions = props.transactions;
  const [pageNumber, setPageNumber] = useState(0);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const transactionsPerPage = 10;
  const pagesVisited = pageNumber * transactionsPerPage;


  const pageCount = Math.ceil(transactions.length / transactionsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
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
                { transactions
    .slice(pagesVisited, pagesVisited + transactionsPerPage)
    .map((data, idx) => (
                    <tr key={idx}>
                      <th scope="row">{pagesVisited+idx+1}</th>
                      <td>{data.date} </td>
                      <td>{data.vendor}</td>
                      <td style={ data.amount > 0 ? {color:"red"} : {color:"green"}}>{data.category} </td>
                      <td>{data.type}</td>
                      <td style={ data.amount > 0 ? {color:"red"} : {color:"green"}}>₹ {Math.abs(data.amount)}</td>
                    </tr>
                ))}
                
              </tbody>
            </Table>
            
        </ModalBody>
        <ModalFooter style={{justifyContent:'left'}}>
        <ReactPaginate
        previousLabel={" < "}
        nextLabel={" > "}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
        </ModalFooter>
      </Modal>
    </div>
      
    </div>
  );
}

export default Statements;