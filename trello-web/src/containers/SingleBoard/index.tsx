import React, { useEffect, useState } from 'react';
//@ts-ignore
import TrelloBoard from 'react-trello'
import { useParams } from 'react-router';
import api from '../../utils/api';
import { Board } from '../../typings';
import { Loader } from 'semantic-ui-react';

const SingleBoard = () =>  {
    const {id} = useParams()
    const [boardDetails, setBoardDetails] = useState<Board | null>(null)
    const [lines, setLines] = useState<any[]>([])

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
            console.log(x)
        }
    }
    
    // const addCard = (card: any, lineId: any) => {
    //     const x = {...lines}
    //     const index = lines.findIndex(({id: listId}) => lineId === listId)
    //     x[index].cards = [...x[index].cards, {title: card.title}]
    //     console.log(x)
    // }
    
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
    return <div >
        {name && <div style={{backgroundColor: "#3179ba"}}>
            <div style={{fontSize: '20px', color: 'white', fontWeight: 'bold', textAlign: 'center', padding: '10px'}}>Nazwa boarda: {name}</div>
            <TrelloBoard onLaneUpdate={editLine} onLaneDelete={deleteLine} onLaneAdd={addLine} data={{lanes: lines}} canAddLanes editable editLaneTitle/>
        </div>}
    </div>
}

export default SingleBoard;
