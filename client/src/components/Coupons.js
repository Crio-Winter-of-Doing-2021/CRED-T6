import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Container, Spinner, Col, Row } from 'reactstrap';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
const cc = require('coupon-code');
const Coupons = () => {

    const coupon = [
        {
            id: 1,
            company: "Flipkart",
            offer: "Get 20% off exclusive on Jeans",
            coins: 300
        },
        {
            id: 2,
            company: "Amazon",
            offer: "Get 10% off exclusive on Headphones",
            coins: 1000
        },
        {
            id: 3,
            company: "Myntra",
            offer: "Get 20% off exclusive on Ethnic Wear",
            coins: 2000
        },
        {
            id: 4,
            company: "Nykaa",
            offer: "Get 30% off exclusive on Beauty Products",
            coins: 1500
        },
        {
            id: 5,
            company: "Amazon",
            offer: "Get 20% off exclusive on Laptops",
            coins: 3000
        },
        {
            id: 6,
            company: "Flipkart",
            offer: "Get 20% off exclusive on Groceries",
            coins: 500
        }
    ]
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [credCoins,setCredCoins] = useState(0);
    const [coupons,setCoupons] = useState([]);

    const getUser = async () =>{
        try{
          axios.defaults.headers.common['x-auth-token'] = localStorage.token;
          const res = await axios.get('/auth');
          console.log(res);
          setCredCoins(res.data.credCoins);
          //setUnclaimed(res.data.unclaimedRewards);
          setCoupons(res.data.coupons);
    
          return;
      }
      catch(err){
          console.log(err);
          //setAuthenticated(false);
          return;
      }
      }
    useEffect(()=>{
        getUser();
        setLoading(false);
      },[])

    const onClick = async (event) => {
        //const curr = Math.floor(Math.random() * 100 + 1);
        //setValue(parseInt(curr));
        console.log(event.target.value);
        try{
            const config = {
                headers:{
                    'Content-Type': 'application/json'
                }
            };

            const amount = coupon[event.target.value-1].coins;
            const couponNo = event.target.value-1;
            const code = cc.generate();

            const body = JSON.stringify({amount,couponNo,code});
    
            const res = await axios.put('/coupons',body, config);
            //localStorage.setItem('token', res.data.token);
            console.log(res.data);
            //setAuthenticated(true);
            setTimeout(() => swal({
              title: "Coupon Claimed!",
              icon: "success",
            }),300);
            
    
            setTimeout(() => window.location.reload(false),1000);
    
        }
        catch(err){
            console.error(err.response.data);
        }
        
      }

    return (
        <div>
            <Button color="danger" onClick={toggle}>Coupons</Button>

            <Modal isOpen={modal} toggle={toggle} scrollable={true} style={{maxHeight:'80vh'}} size="lg">
                <ModalHeader toggle={toggle}><h2>Cred Coins: {credCoins} </h2></ModalHeader>
                <ModalBody>
                    <Container>
                    {coupons.length?<h3>My Coupons:</h3>:<div></div>}
                    <Row>
                            {
                                loading ?
                                    <div> <Spinner color="warning" /> </div>
                                :
                                    coupons.map((e)=>(
                                        <Col xs="12" sm="6" lg="4">
                                            <div className="reward" style={{height:'300px', width:'210px',marginBottom:'15px', paddingTop:'40px', alignContent:'center'}}>
                                                <h1 style={{textAlign: 'center'}}> {coupon[e.couponNo].company} </h1>
                                                <h5 style={{textAlign: 'center'}}> {coupon[e.couponNo].offer} </h5>
                                                <br/>
                                                <h1 style={{textAlign: 'center'}}> {e.code}</h1>
                                                
                                                </div>
                                        </Col>
                                    ))
                            }
                        </Row>
                        <h3>Offers Available:</h3>
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
                                                
                                                <center>{credCoins>=e.coins?<Button onClick={onClick} value={e.id}> Claim Offer</Button>:<Button onClick={onClick} value={e.id} disabled> Claim Offer</Button>}</center>
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
