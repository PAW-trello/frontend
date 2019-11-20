import React from 'react';
import { Card, CardBody, CardTitle, Button, Col } from 'reactstrap';
import { throws } from 'assert';

interface SingleCardProps {
    id: number;
    name: string;
    removeBoard: (id: number) => void;
}

class SingleCard extends React.PureComponent<SingleCardProps> {

    public deleteCard = () => {
        this.props.removeBoard(this.props.id);
        console.log("deleted");
    }
    public editCard = () => {
        console.log("edit");
    }
    public render() {
        const {name, id} = this.props
        return (
            <Col md='4'>
                <Card>
                    <CardBody>
                        <CardTitle>{name}</CardTitle>
                        <Button onClick={this.deleteCard}>Usuń</Button>
                        <Button onClick={this.editCard}>Edytuj</Button>
                        <Button href={`/board/${id}`}>Otwórz</Button>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default SingleCard;
