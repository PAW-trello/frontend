import React from 'react';
import SingleCard from "../../components/SingleCard";
import { Container, Button, Row } from 'reactstrap';
import api from '../../utils/api'
import { Input, CenteredContainer, SingleCardContainer } from './styled';
import { Board } from '../../typings';
let id = 0  

class BoardList extends React.PureComponent {
    public state = {
        boardName: '',
        boards: []
    };

    public addBoard = () => {
        const { boardName, boards } = this.state
        api.addBoard({name: boardName}).then(({ok, data}) => {
            if ({ok, data}) {
                console.log('added to backend')
            } else {
                console.log('problem with adding board')
                console.log(data)
            }
          });
        const newboards = [...boards, { id: ++id, name: boardName }]
        this.setState({
            boardName: '',
            boards: newboards
        });
    }

    public updateRoomName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const boardName = e.target.value;
        this.setState({
            boardName,
        });
    }

    public removeBoard = (removeId: number): void => {
        api.removeBoard(removeId).then(({ok}) =>{
            if(ok) {
                const { boards } = this.state
                const newBoards = boards.filter(({ id }) => id !== removeId)
                this.setState({boards: newBoards})
            }
        })
    }
    
    renderSingleBoard = ({ id, name }: Board) => <SingleCardContainer sm="4">
        <SingleCard
            key={id}
            name={name}
            id={id}
            removeBoard={this.removeBoard}
        />
    </SingleCardContainer>
    
    componentDidMount = () => {
        api.getBoards().then(({data, ok}) =>{
            if(ok) {
                this.setState({boards: data})
            }
        })
    }

    public render() {
        console.log(this.props)
        const {boardName, boards } = this.state
        return (
            <div className='app'>
                <CenteredContainer>
                    <br />
                    <Input type='text'
                        value={boardName}
                        onChange={this.updateRoomName}
                        placeholder="Nowa tablica"
                    />
                    <Button onClick={this.addBoard}>Dodaj tablicę</Button>
                </CenteredContainer>
                <Container>
                    <Row>
                        {boards.map(this.renderSingleBoard)}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default BoardList;
