import React, { useState } from 'react'

const UserContext = React.createContext();

const ContextProvider = ({ children }) => {

    const [me, setMe] = useState('');

    return (
        <UserContext.Provider value={{
            me,
            setMe
        }}>
            {children}
        </UserContext.Provider>
    )
}

export { ContextProvider, UserContext };