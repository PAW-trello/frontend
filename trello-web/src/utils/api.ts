import apisauce from 'apisauce'
import { RegisterPayload, LoginPayload,AddBoardPayload } from '../typings'

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
    const removeLine = (boardId: number,lineId: number) => api.delete(`/boards/${boardId}/lists/${lineId}`)
    const editLine = (boardId: number,lineId: number, newName: string) => api.put(`/boards/${boardId}/lists/${lineId}`, {title: newName})
    const addCard = (lineId: number, title: string, description?: string, label?: string) => api.post(`/lists/${lineId}/cards`, {title, description, label})
    const editCard = (lineId: number, cardId: number, title: string, description?: string, label?: string) => api.put(`/lists/${lineId}/cards/${cardId}`, {title, description, label})
    const removeCard = (lineId: number, cardId: number) => api.delete(`/lists/${lineId}/cards/${cardId}`)
    const showCardDetails = (lineId: number, cardId: number) => api.get(`/lists/${lineId}/cards/${cardId}`)
    const addComment = (cardId: number, message: string) => api.post(`cards/${cardId}/comments`, {message, title: ''}) 
    const editComment = (cardId: number, commentId: number, message: string) => api.put(`/cards/${cardId}/comments/${commentId}`, {message, title: ''})
    const removeComment = ( cardId: number, commentId: number) => api.delete(`/cards/${cardId}/comments/${commentId}`)
    const showAllCardComments = (cardId: number) => api.get(`/cards/${cardId}/comments`)

    const changeLineOrder = (toLine: number, lineId: number,) => api.post(`/lists/${lineId}/swap`, {to: toLine + 1})


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
        changeLineOrder,
        addCard,
        editCard,
        removeCard,
        showCardDetails,
        addComment,
        editComment,
        removeComment,
        showAllCardComments
    }
}
const api = () => create()


export default api()
