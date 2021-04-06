import React, { useState,useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import BarChart from './BarChart';
import DonutChart from './DonutChart';
import { TabContent, TabPane, Nav, NavItem, NavLink,  Row, Col } from 'reactstrap';
import classnames from 'classnames';



const SmartStatements = (props) => {

  const [modal, setModal] = useState(false);
  const [byTypeLabel, setByTypeLabel] = useState([]);
  const [byVendorLabel,setByVendorLabel] = useState([]);
  const [byTypeData, setByTypeData] = useState([]);
  const [byVendorData,setByVendorData] = useState([]);
  const [activeTab, setActiveTab] = useState('1');
  const toggle = () => setModal(!modal);
  const toggle2 = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
  
  function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
       const key = obj[property];
       if (!acc[key]) {
          acc[key] = 0;
       }
       // Add object to list for given key's value
       acc[key] += obj.amount;
       return acc;
    }, {});
 }


  useEffect(()=>{
    const res = groupBy(props.transactions,'type');
    console.log(res);
    //delete res.Self;
    let res_f1 = Object.keys(res);
    res_f1 = res_f1.filter((i) => i !== 'Bill payment');
    
    let res_f2 = Object.values(res);
    res_f2 = res_f2.filter((i) => i > 0);
    
    console.log(res_f1);
    console.log(res_f2);
    setByTypeLabel(res_f1);
    setByTypeData(res_f2);
    const res2 = groupBy(props.transactions,'vendor');
    
    let res_f3 = Object.keys(res2);
    res_f3 = res_f3.filter((i) => i !== 'Self');
    
    let res_f4 = Object.values(res2);
    res_f4 = res_f4.filter((i) => i > 0);
    

    setByVendorLabel(res_f3);
    setByVendorData(res_f4);
},[props.transactions])
  return (
    <div>
      <Button color="primary" onClick={toggle}><strong>{props.text}</strong></Button>
      <Modal isOpen={modal} toggle={toggle} fullscreen="lg" size="lg">

        <ModalHeader toggle={toggle}>Smart Transactions</ModalHeader>
        <ModalBody>
          
        <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle2('1'); }}
          >
            Vendor
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle2('2'); }}
          >
            Vendor %
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle2('3'); }}
          >
            Type
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle2('4'); }}
          >
            Type %
          </NavLink>
        </NavItem>
        
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
                <BarChart labels = {byVendorLabel} data ={byVendorData} />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
                <DonutChart labels = {byVendorLabel} data ={byVendorData}/>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
        <Row>
            <Col sm="12">
            <BarChart labels = {byTypeLabel} data ={byTypeData}/>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="4">
        <Row>
            <Col sm="12">
            <DonutChart labels = {byTypeLabel} data ={byTypeData}/>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
          
        </ModalBody>
        <ModalFooter>
          <Button  color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}


export default SmartStatements;