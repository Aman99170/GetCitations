import { Dispatch, SetStateAction, createContext, useContext } from 'react'
import { IUserInfo } from './type'

export interface IAuthContext {
    userInfo:IUserInfo
    isLoggedIn: boolean
    loading:boolean
    logOut: () => void
    setIsLoggedIn:Dispatch<SetStateAction<boolean>>
    setUserInfo:Dispatch<SetStateAction<IUserInfo>>
}
let defaultDate = new Date()
defaultDate.setDate(defaultDate.getDate() + 3)

const initialContext: IAuthContext = {
    logOut: () => {},
    isLoggedIn:false,
    loading:true,
    userInfo:{_id:"",firstName:"",lastName:"",mobileNumber:"",email:"",createdAt:defaultDate,updatedAt:defaultDate,userType:""},
    setIsLoggedIn:()=>{},
    setUserInfo:()=>{}
}

export const AuthContext = createContext<IAuthContext>(initialContext)
export const useAuthContext = () => useContext(AuthContext)