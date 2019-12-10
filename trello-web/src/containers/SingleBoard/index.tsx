import React, { useEffect, useState } from 'react';
//@ts-ignore
import TrelloBoard from 'react-trello'
import { useParams } from 'react-router';
import api from '../../utils/api';
import { Board } from '../../typings';
import { Loader, Modal } from 'semantic-ui-react';
import CardModalContent from '../CardModalContent';

const SingleBoard = () =>  {
    const {id} = useParams()
    const [boardDetails, setBoardDetails] = useState<Board | null>(null)
    const [lines, setLines] = useState<any[]>([])
    const [chosenCard, setChosenCard] = useState<number | null>(null)

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
    }
    const closeModal = () => setChosenCard(null)

    const handleLineEnd = (_: number, toIndex: number, payload: any) => {
        api.changeLineOrder(toIndex, +payload.id)
    }
    
    useEffect(() => {
        if(id) {
            api.getBoardDetails(+id).then(({data}) => {
                setBoardDetails(data as Board)
                // @ts-ignores
                const lines = data.lists.map(list => ({...list, id: '' + list.id, cards: []}))
                setLines(lines)
            })
        }
    }, [])
    if(boardDetails === null) return <Loader active/>
    const {name} = boardDetails
    return <>
        <div >
            {name && <div style={{backgroundColor: "#3179ba"}}>
                <div style={{fontSize: '20px', color: 'white', fontWeight: 'bold', textAlign: 'center', padding: '10px'}}>Nazwa boarda: {name}</div>
                <TrelloBoard draggable handleLaneDragEnd={handleLineEnd} onCardClick={clickCard} onLaneUpdate={editLine} onLaneDelete={deleteLine} onLaneAdd={addLine} data={{lanes: lines}} canAddLanes editable editLaneTitle/>
            </div>}
        </div>
      <Modal open={!!chosenCard} onClose={closeModal}>
           <CardModalContent cardId={chosenCard} />
       </Modal>
    </>
}

export default SingleBoard;
