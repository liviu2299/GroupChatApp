import { ContextProvider } from '../context/SocketContext'

import Room from './Room'

export default function RoomWrapper(props) {
    return (
        <ContextProvider>
            <Room />
        </ContextProvider>
    )
}



