import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function Form(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <TextField 
                label="Name"
                variant="outlined"
                required
                value={props.name}
                onChange={e => props.setName(e.target.value)}
            />
            <div>
                <Button type="submit" variant="contained">
                    Create Room
                </Button>
            </div>
        </form>
    )
}
