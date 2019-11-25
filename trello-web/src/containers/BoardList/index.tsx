import React from 'react';
import SingleCard from "../../components/SingleCard";
import { Container, Button } from 'reactstrap';
import api from '../../utils/api'
interface BoardListProps {
    id: number;
    addBoard: (roomName: string) => void;
}

let id = 0

class BoardList extends React.PureComponent<BoardListProps> {
    public state = {
        boardName: '',
        boards: []
    };

    public addBoard = () => {
        const { boardName, boards } = this.state
        api.addBoard({name: boardName})   .then(({ok, data}) => {
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
        const { boards } = this.state
        const newBoards = boards.filter(({ id }) => id !== removeId)
        this.setState({boards: newBoards})
    }

    public editName = (editId: number, newName: string): void => {
        const { boards } = this.state
        const boardEdit = boards.find(({ id }) => id === editId)
        if (boardEdit !== undefined) {
            // @ts-ignore
           boardEdit.name =  newName
        } 
        // const newBoards = boards.filter(({ id }) => id !== removeId)
        // this.setState({boards: newBoards})
    }

    renderSingleBoard = ({ id, name }) => <SingleCard
            key={id}
            name={name}
            id={id}
            removeBoard={this.removeBoard}
        />
    

    public render() {
        const {boardName, boards } = this.state
        return (
            <div className='app'>
                <div>
                    {this.state.boardName}
                    <br />
                    <input type='text'
                        value={boardName}
                        onChange={this.updateRoomName}
                        placeholder="Nazwa tablicy"
                    />
                    <Button style={{margin: 5}} onClick={this.addBoard}>Dodaj tablicę</Button>
                </div>
                <Container>
                    {boards.map(this.renderSingleBoard)}

                </Container>
            </div>
        );
    }
}

export default BoardList;
