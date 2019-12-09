import apisauce from 'apisauce'
import {RegisterPayload, LoginPayload, AddBoardPayload, AddCardPayload} from '../typings'

const baseURL = "https://mighty-hollows-81695.herokuapp.com/"

const create = () => {
    const THIRTY_SECONDS_TIMEOUT = 30000

    const api = apisauce.create({
        baseURL,
        headers: {
            'Content-type': 'application/json'
        },
        timeout: THIRTY_SECONDS_TIMEOUT,
    });
    const setAuthorizationHeader = (token: string) => api.setHeader('Authorization', `Bearer ${token}`)
    const logout = () => delete api.headers['Authorization']
    const register = (registerPayload: RegisterPayload) => api.post(`signup`, registerPayload)
    const login = (loginPayload: LoginPayload) => api.post(`auth/login`, loginPayload)
    const addBoard = (addBoardPayload: AddBoardPayload) => api.post(`boards`, addBoardPayload)
    const getBoards = () => api.get('/boards')
    const removeBoard = (boardId: number) => api.delete(`/boards/${boardId}`)
    const updateBoard = (name: string, boardId: number) => api.put(`/boards/${boardId}`, {name})
    const headers = () => api.headers.Authorization
    const getBoardDetails = (boardId: number) => api.get(`/boards/${boardId}`)
    const addNewLine = (boardId: number, listName: string) => api.post(`/boards/${boardId}/lists`, {title: listName})
    const removeLine = (boardId: number, lineId: number) => api.delete(`/boards/${boardId}/lists/${lineId}`)
    const editLine = (boardId: number, lineId: number, newName: string) => api.put(`/boards/${boardId}/lists/${lineId}`, {title: newName})
    const addCard = (card: AddCardPayload, laneId: number) => api.post(`/lists/${laneId}/cards`, card);
    const getCardDetails = (laneId: number, cardId: number) => api.get(`/lists/${laneId}/cards/${cardId}`);
    const getAllCards = (boardId: number, laneId: number) => api.get(`/boards/${boardId}/lists/${laneId}/cards`);


    return {
        logout,
        setAuthorizationHeader,
        register,
        login,
        addBoard,
        getBoards,
        removeBoard,
        updateBoard,
        headers,
        getBoardDetails,
        addNewLine,
        removeLine,
        editLine,
        addCard,
        getCardDetails,
        getAllCards
    }
}
const api = () => create()


export default api()
