import React, { useState } from 'react'

const UserContext = React.createContext();

const ContextProvider = ({ children }) => {

    const [myName, setMyName] = useState('');
    const [color, setColor] = useState('');
    const [commit, setCommit] = useState(false);

    const [proximity, setProximity] = useState({
        x: 0,
        y: 0
    });

    const [usersAround, setUsersAround] = useState([]);

    return (
        <UserContext.Provider value={{
            myName,
            color,
            proximity,
            usersAround,
            commit,
            setMyName,
            setColor,
            setUsersAround,   
            setCommit,
            setProximity
        }}>
            {children}
        </UserContext.Provider>
    )
}

export { ContextProvider, UserContext };