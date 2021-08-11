import React, { useState, useEffect } from 'react'

const UserContext = React.createContext();

const ContextProvider = ({ children }) => {

    const [me, setMe] = useState('');
    const [commit, setCommit] = useState(false);

    /*
    useEffect(() => {
        console.log('Usercontext: ' + me);
    }, [me])

    useEffect(() => {
        console.log('Usercontext: ' + commit);
    }, [commit])*/

    return (
        <UserContext.Provider value={{
            me,
            setMe,
            commit,
            setCommit
        }}>
            {children}
        </UserContext.Provider>
    )
}

export { ContextProvider, UserContext };