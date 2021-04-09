import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Container, Spinner, Col, Row } from 'reactstrap';
import React, {useState, useEffect} from 'react';


const Coupons = () => {

    const coupon = [
        {
            id: 1,
            company: "Flipkart",
            offer: "Get 20% off exclusive at Jeans",
            coins: 300
        },
        {
            id: 2,
            company: "Amazon",
            offer: "Get 10% off exclusive at Headphones",
            coins: 1000
        },
        {
            id: 3,
            company: "Myntra",
            offer: "Get 20% off exclusive at Ethnic Wear",
            coins: 2000
        },
        {
            id: 4,
            company: "Nykaa",
            offer: "Get 30% off exclusive at Beauty Products",
            coins: 1500
        },
        {
            id: 5,
            company: "Amazon",
            offer: "Get 20% off exclusive at Laptops",
            coins: 3000
        },
        {
            id: 6,
            company: "Flipkart",
            offer: "Get 20% off exclusive at Groceries",
            coins: 500
        }
    ]
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    
    useEffect(()=>{
        setLoading(false);
      },[])

    const onClick = () => {

    }

    return (
        <div>
            <Button color="danger" onClick={toggle}>Coupons </Button>

            <Modal isOpen={modal} toggle={toggle} scrollable={true} style={{maxHeight:'80vh'}} size="lg">
                <ModalHeader toggle={toggle}><h2>Coupons</h2></ModalHeader>
                <ModalBody>
                    <Container>
                        <Row>
                            {
                                loading ?
                                    <div> <Spinner color="warning" /> </div>
                                :
                                    coupon.map((e)=>(
                                        <Col xs="12" sm="6" lg="4">
                                            <div className="reward" style={{height:'300px', width:'210px',marginBottom:'15px', paddingTop:'40px', alignContent:'center'}}>
                                                <h1 style={{textAlign: 'center'}}> {e.company} </h1>
                                                <h5 style={{textAlign: 'center'}}> {e.offer} </h5>
                                                <br/>
                                                <h5 style={{textAlign: 'center'}}> Pay {e.coins} Coins</h5>
                                                
                                                <center><Button onClick={onClick}> Claim Offer</Button></center>
                                            </div>
                                        </Col>
                                    ))
                            }
                        </Row>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal> 
        </div>
    )
}

export default Coupons;
