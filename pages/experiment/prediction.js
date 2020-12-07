import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';

const Prediction = () => {

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <TextField
                id="experiment-name"
                select
                label="Experiment Name"
                value='Experiment 1'
                style={{marginBottom: 32}}
            >
                <MenuItem key='exp-1' value='Experiment 1'>
                    Experiment 1 
                </MenuItem>
            </TextField>

            <TextField
                id="standard-multiline-static"
                label="Input"
                multiline
                rows={4}
                defaultValue="Input text here"
                style={{marginBottom: 32}}
            />

            <Button
                variant='outlined'
                color='primary'
                style={{marginBottom: 32}}
            >
                Predict
            </Button>

            <TextField
                id="standard-multiline-static"
                label="Output"
                multiline
                rows={4}
                defaultValue="Input text here"
                style={{marginBottom: 32}}
            />
        </div>
    )
}

export default Prediction;