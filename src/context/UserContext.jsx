import { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const UserContext = createContext()

export default function UserProvider({children}) {
    
    const lsUser = JSON.parse(localStorage.getItem("user"))
    const [user, setUser] = useState(lsUser !== null ? lsUser : {})
    const navigate = useNavigate()
    const location = useLocation();


    useEffect(() => {
        
        if (lsUser === null && location.pathname !== '/cadastro') {
          navigate('/');
        } else if (lsUser === null && location.pathname === '/cadastro') {
         console.log("Consegue mudar para a tela de cadastro escrevendo na URL")
        } else {
          navigate('/home');
        }
      }, []);

    console.log('lsUser aqui',lsUser)
    
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}