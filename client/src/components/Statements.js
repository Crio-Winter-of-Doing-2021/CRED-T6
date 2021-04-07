import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import ReactPaginate from "react-paginate";

const Statements = (props) =>{

  const currMonth = 4;
  const currYear = 21;
 
  const t = props.transactions;

  const [transactions, setTransactions] = useState(props.transactions);
  const [pageNumber, setPageNumber] = useState(0);
  const [modal, setModal] = useState(false);
  const [month, setMonth] = useState(currMonth);
  const [year, setYear] = useState(currYear);

  //setTransactions([...t,]);

  const toggle = () => setModal(!modal);

  const transactionsPerPage = 10;
  const pagesVisited = pageNumber * transactionsPerPage;

  const pageCount = Math.ceil(transactions.length / transactionsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const monthChange = (event) => {
    setMonth(event.target.value);
  }

  const yearChange = (event) => {
    setYear(event.target.value);
  }

  const onSubmit = (event) => {
    //console.log(event);
    //filterTransaction();
    event.preventDefault();
  }

  const filterTransaction = () => {
    alert("/"+ month + "/" + year);
    setTransactions( props.transactions.filter(item => item.date.includes("/"+ month + "/" + year)));
  }
  console.log(transactions);
  return (
    <div>
        <div>
      <Button color="primary" onClick={toggle}><strong>{props.text}</strong></Button>
      <Modal isOpen={modal} toggle={toggle} fullscreen="lg" size="lg">

        <ModalHeader toggle={toggle}>Transactions</ModalHeader>
        <ModalBody>

        <form onSubmit={onSubmit}>
        <label>
          Select Month and Year:
          <select value={month} onChange={monthChange}>
            <option value="1">Jan</option>
            <option value="2">Feb</option>
            <option value="3">Mar</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">Jul</option>
            <option value="8">Aug</option>
            <option value="9">Sep</option>
            <option value="10">Oct</option>
            <option value="11">Nov</option>
            <option value="12">Dec</option>
          </select>
          <select value={year} onChange={yearChange}>
            <option value="17">2017</option>
            <option value="18">2018</option>
            <option value="19">2019</option>
            <option value="20">2020</option>
            <option value="21">2021</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>

          
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
                { transactions.filter(item => item.date.includes("/"+ month + "/" + year))
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