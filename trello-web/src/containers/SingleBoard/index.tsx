import React, { useEffect, useState } from 'react';
//@ts-ignore
import TrelloBoard from 'react-trello'
import { useParams } from 'react-router';
import api from '../../utils/api';
import {AddCardPayload, Board, Card} from '../../typings';
import { Loader, Modal } from 'semantic-ui-react';
import CardModalContent from '../CardModalContent';

const SingleBoard = () =>  {
    const {id} = useParams()
    const [boardDetails, setBoardDetails] = useState<Board | null>(null)
    const [lines, setLines] = useState<any[]>([])
    // const [cards, setCards] = useState<Card | null>([])
    const [chosenCard, setChosenCard] = useState<number | null>(null)
    const [chosenLine, setChosenLine] = useState<number | null>(null)


    const addLine = ({title}: {title: string}) => {
        if(id) {
            api.addNewLine(+id, title).then(({data}) => {
                // @ts-ignore
                const x = {...data, id: '' + data.id, cards: []}
                const newList  = [...lines, x]
                setLines(newList)
            })
        }
    }

    const deleteLine = (lineId: number) => {
        if(id) {
            api.removeLine(+id, lineId)
            const x = lines.filter(({id: listId}) => lineId !== listId)
            setLines(x)
        }
    }

    const editLine = (lineId: number, {title}: {title: string}) => {
        if(id) {
            api.editLine(+id, lineId, title)
            const x = {...lines}
            const index = lines.findIndex(({id: listId}) => lineId === listId)
            x[index].title = title
        }
    }
    const clickCard = (cardId: number, metadata: any, lineId: number) => {
        setChosenCard(cardId)
        setChosenLine(lineId);
    }
    const closeModal = () => setChosenCard(null )

    const addCard = (card: AddCardPayload, laneId: number) => {
        if(id) {
            // api.addCard(card, laneId).then(({data}) => {
            //     console.log(data.title);
            //     const x = {...data, id: '' + data.id, cards: []}
            //     const newList  = [...lines, x]
            //     setLines(newList)
            // })
        }
    }

    useEffect(() => {
        if(id) {
            api.getBoardDetails(+id).then(({data}) => {
                setBoardDetails(data as Board)
                // @ts-ignores
                console.log(data.boardId);
                // @ts-ignores
                const lines = data.lists.map(list => ({...list, id: '' + list.id, cards: []}))
                setLines(lines)
            })

            api.getAllCards(+id, lines[1].id).then(({data}) => {
                // setBoardDetails(data as Card)
                // // @ts-ignores
                // const lines = data.lists.map(list => ({...list, id: '' + list.id, cards: []}))
                // setLines(lines)
            })
        }
    }, [])
    if(boardDetails === null) return <Loader active/>
    const {name} = boardDetails
    return <>
        <div >
            {name && <div style={{backgroundColor: "#3179ba"}}>
                <div style={{fontSize: '20px', color: 'white', fontWeight: 'bold', textAlign: 'center', padding: '10px'}}>Nazwa boarda: {name}</div>
                <TrelloBoard onCardClick={clickCard} onLaneUpdate={editLine} onLaneDelete={deleteLine} onLaneAdd={addLine} onCardAdd={addCard} data={{lanes: lines}} canAddLanes editable editLaneTitle/>
            </div>}
        </div>
      <Modal open={!!chosenCard} onClose={closeModal}>
           <CardModalContent cardId={chosenCard} laneId={chosenLine}/>
       </Modal>
    </>
}

export default SingleBoard;
