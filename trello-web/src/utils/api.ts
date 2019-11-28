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
        getBoardDetails
    }
}
const api = () => create()


export default api()
