import React, { useEffect } from 'react';
//@ts-ignore
import Board from 'react-trello'
// import api from '../../utils/api';
import { useParams } from 'react-router';

const SingleBoard = () =>  {
    const params = useParams()
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
        console.log(params)
    }, [])

    return <div>
        Test
    </div>
}

export default SingleBoard;
