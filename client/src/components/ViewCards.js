import Card from './Card'
import { Container, Row, Col } from 'reactstrap';
const ViewCards = ({ cards,  payBill }) => {
    return (
         <Container>
         <Row >
         {cards.map((card) => (
              <Col sx = '12' md = '6' lg='6' ><Card key={card.cardNumber} card={card}  payBill={payBill}/></Col>
           ))}
         </Row>
       </Container>
    )
}

export default ViewCards