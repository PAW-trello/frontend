import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Button, Spinner } from 'reactstrap';
import { SpinnerContainer, CenterContainer } from './styled';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
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
            setTimeout(() => {
                window.addEventListener('click', clickListener)
            }, 0);
        } else {
            window.removeEventListener('click', clickListener)
        }
    }, [inputOpened])


    const clickListener = (e: MouseEvent) => {
        //@ts-ignore
        if(inputOpened && e.target && e.target.id !== 'edit-name') {
            editCard()
        }
    }

    const deleteCard = () => {
        removeBoard(id);
    }
    
    const editCard = () => {
        setLoadingState(true)
        setInputOpened(false)
        api.updateBoard(newName, id).then(({ok}) => {
            if(ok) {
                setLoadingState(true)
            } else {
                toast.error('Nie udało się zaktualizować boarda')
                setNewName(name)
            }
        })

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
                <CardBody>
                    {loadingState && <SpinnerContainer>
                        <Spinner />
                        </SpinnerContainer>
                    }
                    {!loadingState && <>
                        {!inputOpened && <CardTitle onClick={showInput}>{newName}</CardTitle>}
                        {inputOpened && <input id={'edit-name'} value={newName} onChange={changeName} onKeyDown={keyDownHandler}/> }
                        <br/>
                        <CenterContainer>
                            <Button tag={Link} to={`/board/${id}`}>Otwórz</Button>
                            <Button onClick={deleteCard}>Usuń</Button>
                        </CenterContainer>
                    </>}
                </CardBody>
            </Card>
    );
    
}

export default SingleCard;
