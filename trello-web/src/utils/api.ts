import apisauce from 'apisauce'
// import { BoardList } from '../containers/BoardList' 
const baseURL = "https://mighty-hollows-81695.herokuapp.com/"

const create = () => {
    const THIRTY_SECONDS_TIMEOUT = 30000

    const api = apisauce.create({
        baseURL,
        headers: { 'Cache-Control': 'no-cache' },
        timeout: THIRTY_SECONDS_TIMEOUT,
    });
    // const addBoard = (addBoardpayload: BoardList) => api.post(`boards`, addBoardpayload);
}
