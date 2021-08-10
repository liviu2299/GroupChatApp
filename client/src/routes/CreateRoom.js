import React, { useContext } from 'react'
import { v1 as uuid } from "uuid";

import Form from '../components/form/Form';
import { UserContext } from '../context/UserContext';

export default function CreateRoom(props) {

    const {me, setMe} = useContext(UserContext);

    function handleSubmit() {
        const id = uuid();
        props.history.push(`/room/${id}`);
    }

    return (
        <div>
            <Form name={me} setName={setMe} handleSubmit={handleSubmit}/>
        </div>
    )
}