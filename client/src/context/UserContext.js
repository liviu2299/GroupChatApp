import React, { useState, useEffect } from 'react'

const UserContext = React.createContext();

const ContextProvider = ({ children }) => {

    const [myName, setMyName] = useState('');
    const [color, setColor] = useState('');
    const [commit, setCommit] = useState(false);

    const [proximity, setProximity] = useState({
        x: 0,
        y: 0
    });

    return (
        <UserContext.Provider value={{
            myName,
            color,
            proximity,
            setMyName,
            setColor,
            commit,
            setCommit,
            setProximity
        }}>
            {children}
        </UserContext.Provider>
    )
}

export { ContextProvider, UserContext };