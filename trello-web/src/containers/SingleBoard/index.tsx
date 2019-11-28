import React, { useEffect, useState } from 'react';
//@ts-ignore
import TrelloBoard from 'react-trello'
import { useParams } from 'react-router';
import api from '../../utils/api';
import { Board } from '../../typings';
import { Spinner } from 'reactstrap';

const SingleBoard = () =>  {
    const {id} = useParams()
    const [boardDetails, setBoardDetails] = useState<Board | null>(null)
    // data = {
    //     lanes: [
    //         {
    //             id: 'lane1',
    //             title: 'Planned Tasks',
    //             label: '2/2',
    //             cards: [
    //                 {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', draggable: false},
    //                 {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}}
    //             ]
    //         },
    //         {
    //             id: 'lane2',
    //             title: 'Completed',
    //             label: '0/0',
    //             cards: []
    //         }
    //     ]
    // }
    useEffect(() => {
        if(id) {
            api.getBoardDetails(+id).then(({data}) => {
                setBoardDetails(data as Board)
            })
        }
    }, [])
    if(boardDetails === null) return <Spinner/>
    const {name} = boardDetails
    return <div>
        {boardDetails !== null && <div>
            Nazwa boarda: {name}
        </div>}
    </div>
}

export default SingleBoard;
