import React from 'react';
import { Card, CardBody, CardTitle, Button, Col } from 'reactstrap';
import { throws } from 'assert';

interface SingleCardProps {
    id: number;
    name: string;
    // deleteCard: (id: number) => void;
}

class SingleCard extends React.PureComponent<SingleCardProps> {

    public deleteCard = () => {
        // this.props.deleteCard(this.props.id);
        console.log("deleted");
    }
    public editCard = () => {
        console.log("edit");
    }
    private openBoard = () => {
        console.log("edit");
    }

    public render() {
        return (
            <Col md='4'>
                <Card>
                    <CardBody>
                        <CardTitle>{this.props.name}</CardTitle>
                        <Button onClick={this.deleteCard}>Usuń</Button>
                        <Button onClick={this.editCard}>Edytuj</Button>
                        <Button href='/board'>Otwórz</Button>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default SingleCard;
