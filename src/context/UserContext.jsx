import { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const UserContext = createContext()

export default function UserProvider({children}) {
    
    const lsUser = JSON.parse(localStorage.getItem("user"))
    const [user, setUser] = useState(lsUser !== null ? lsUser : {})
    const navigate = useNavigate()
    const location = useLocation();


    useEffect(() => {
        
      if((lsUser === undefined || lsUser === null) && location.pathname == '/home' || (lsUser === undefined || lsUser === null) && (location.pathname == '/nova-transacao/entrada' || location.pathname == '/nova-transacao/saida'))
        {
          navigate('/');
        }
      }, []);

    console.log('lsUser aqui',lsUser)
    
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}