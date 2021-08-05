import React from 'react'
import { v1 as uuid } from "uuid";

export default function RoomWrapper(props) {
    function create() {
        const id = uuid();
        props.history.push(`/room/${id}`);
    }

    return (
        <div>
            <button onClick={create}>Create room</button>
        </div>
    )
}