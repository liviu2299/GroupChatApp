import React, { useState, useEffect } from 'react'

const UserContext = React.createContext();

const ContextProvider = ({ children }) => {

    const [myName, setMyName] = useState('');
    const [color, setColor] = useState('');
    const [commit, setCommit] = useState(false);

    useEffect(() => {
        console.log(color.hex);
    }, [color])

    return (
        <UserContext.Provider value={{
            myName,
            color,
            setMyName,
            setColor,
            commit,
            setCommit
        }}>
            {children}
        </UserContext.Provider>
    )
}

export { ContextProvider, UserContext };