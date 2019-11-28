import React, {useState, useEffect} from 'react';
import SingleCard from "../../components/SingleCard";
import api from '../../utils/api'
import { CenteredContainer, InputStyled } from './styled';
import { Board } from '../../typings';
import { toast } from 'react-toastify';
import { Button, Grid, Card } from 'semantic-ui-react';

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
    
    const renderSingleBoard = ({ id, name }: Board) => 
        <SingleCard
            key={id}
            name={name}
            id={id}
            removeBoard={removeBoard}
        />
    
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
                    <InputStyled type='text'
                        value={boardName}
                        onChange={updateRoomName}
                        placeholder="Nowa tablica"
                    />
                    <Button disabled={boardName.length === 0} onClick={addBoard}>Dodaj tablicę</Button>
                </CenteredContainer>
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column computer={9} >
                            <Card.Group>
                                {boards.map(renderSingleBoard)}
                            </Card.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
    )
    
}

export default BoardList;
