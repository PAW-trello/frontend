import React, {useState, useEffect} from 'react';
import SingleCard from "../../components/SingleCard";
import { Container, Button, Row } from 'reactstrap';
import api from '../../utils/api'
import { Input, CenteredContainer, SingleCardContainer } from './styled';
import { Board } from '../../typings';
import { toast } from 'react-toastify';

const BoardList = () => {
    const [boardName, setBoardName] = useState('')
    const [boards, setBoards] = useState<Board[]>([])

    const addBoard = () => {
            api.addBoard({name: boardName}).then(({ok, data}) => {
                if ({ok, data}) {
                    boards.push(data as Board)
                    setBoards(boards)
                    setBoardName('')
                } else {
                    toast.error("Nie dodano tablicy")
                }
            });
    }

    const updateRoomName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBoardName(e.target.value)
    }

    const removeBoard = (removeId: number): void => {
        api.removeBoard(removeId).then(({ok}) =>{
            if(ok) {
                const newBoards = boards.filter(({ id }) => id !== removeId)
                setBoards(newBoards)
            }
        })
    }
    
    const renderSingleBoard = ({ id, name }: Board) => <SingleCardContainer key={id} sm="4">
        <SingleCard
            name={name}
            id={id}
            removeBoard={removeBoard}
        />
    </SingleCardContainer>
    
    useEffect(() => {
        api.getBoards().then(({data, ok}) =>{
            if(ok) { 
                setBoards(data as Board[])
            }
        })
    }, [])


    return (
            <div className='app'>
                <CenteredContainer>
                    <br />
                    <Input type='text'
                        value={boardName}
                        onChange={updateRoomName}
                        placeholder="Nowa tablica"
                    />
                    <Button disabled={boardName.length === 0} onClick={addBoard}>Dodaj tablicę</Button>
                </CenteredContainer>
                <Container>
                    <Row>
                        {boards.map(renderSingleBoard)}
                    </Row>
                </Container>
            </div>
    )
    
}

export default BoardList;
