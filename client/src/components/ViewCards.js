import Card from './Card'

const ViewCards = ({ cards,  payBill }) => {
    return (
        <div>
            {cards.map((card) => (
                <Card key={card.cardNumber} card={card}  payBill={payBill}/>
            ))}
        </div>
    )
}

export default ViewCards
