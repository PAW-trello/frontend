import apisauce from 'apisauce'
import { RegisterPayload, LoginPayload } from '../typings'

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
     
    
    return {
        logout,
        setAuthorizationHeader,
        register,
        login
    }
}
const api = () => create()


export default api()
