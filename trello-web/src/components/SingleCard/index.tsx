import React, { useState, useEffect } from 'react';
import { SpinnerContainer, IconStyled } from './styled';
// import api from '../../utils/api';
// import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Card, Button, Loader } from 'semantic-ui-react';
interface SingleCardProps {
    id: number;
    name: string;
    removeBoard: (id: number) => void;
}

const SingleCard = ({id, name, removeBoard}: SingleCardProps) => {
    const [newName, setNewName] = useState(name)
    const [inputOpened, setInputOpened] = useState(false)
    const [loadingState, setLoadingState] = useState(false)

    useEffect(() => {
        if(inputOpened) {
            console.log('add')
                window.addEventListener('click', clickListener)
        } else {
            console.log('remove')
            window.removeEventListener('click', clickListener)
        }
    }, [inputOpened])


    const clickListener = (e: MouseEvent) => {
        //@ts-ignore
        if(inputOpened && e.target && e.target.id !== 'edit-name') {
            console.log("Xs")
            editCard()
        }
    }

    const deleteCard = () => {
        removeBoard(id);
    }
    
    const editCard = () => {
        if(inputOpened) {
            setLoadingState(true)
            setInputOpened(false)
            // api.updateBoard(newName, id).then(({ok}) => {
            //     if(ok) {
            //         setLoadingState(true)
            //     } else {
            //         toast.error('Nie udało się zaktualizować boarda')
            //         setNewName(name)
            //     }
            // })
            console.log('edytujre')
        }
    }
    const showInput = () => setInputOpened(true)

    const changeName=(e:  React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value)
    }

    const keyDownHandler = (e:  React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            editCard()
            return
        }
    }

    return (
        <Card>
            {loadingState && <SpinnerContainer>
                <Loader active />
            </SpinnerContainer>}
            {!loadingState && <>
                <Card.Content>
                    <IconStyled
                        color="red"
                        name="cancel"
                        onClick={deleteCard}
                    />
                    <Card.Header>
                        {!inputOpened && <div onClick={showInput}>{newName}</div>}
                        {inputOpened && <input id='edit-name' value={newName} onChange={changeName} onKeyDown={keyDownHandler}/> }
                    </Card.Header>
                    <br/>
                </Card.Content>
                <Card.Content extra>
                    <Link to={`/board/${id}`} className='ui one buttons'>
                        <Button basic color='green'>
                            Otwórz
                        </Button>
                    </Link>
                </Card.Content>
            </>}
        </Card>
    );
    
}

export default SingleCard;
