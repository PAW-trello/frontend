import React from 'react';
import SingleCard from "../../components/SingleCard";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import { Container, Row, Card, CardBody, CardTitle, Button, Col } from 'reactstrap';

interface BoardListProps {
    id: number;
    addBoard: (roomName: string) => void;
}

class BoardList extends React.PureComponent<BoardListProps> {
    public state = {
        boardName: '',
    };

    public addBoard = () => {
        this.props.addBoard(this.state.boardName);
        this.setState({
            boardName: '',
        });
    }

    public updateRoomName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const roomName = e.target.value;
        this.setState({
            roomName,
        });

    }
    temp = 1;
    public render() {
     
        return (
            <div className='app'>
                <div>
                    {this.state.boardName}
                    <br />
                    <input type='text'
                        //    value={this.state.boardName}
                        onChange={(e) => this.updateRoomName(e)}
                        placeholder="Nazwa tablicy"
                    />
                    <Button style={{margin: 5}} onClick={this.addBoard}>Dodaj tablicę</Button>
                </div>
                <Container>
                    <SingleCard
                        key="0"
                        name="nazwa"  id={this.temp} />
                </Container>
            </div>
        );
    }
}

export default BoardList;
