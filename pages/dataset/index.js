import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';


const Dataset = () => {

    const fileDropHandler = e => {
        console.log('file dropped');
        e.preventDefault();

        const file = e.dataTransfer.files[0];

        const data = new FormData();
        data.append('file', file);
        data.append('user', 'roger');

        fetch('http://localhost:3001/api/file/upload', {
            method: 'POST',
            body: data,
            mode: 'cors'
        }).then(data => console.log(data));
    };

    const fileDragOverHandler = e => {
        console.log('file is in drop zone');
        e.preventDefault();
    };

    return(
        <div
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '20%',
                }}
            >
                <TextField
                    required
                    id="experiment-name"
                    label="Name"
                    defaultValue="New dataset name"
                    style={{marginBottom: 16}}
                />

                <FormControl component="fieldset" style={{marginBottom: 16}}>
                    <FormLabel component="legend">Type</FormLabel>
                    <RadioGroup row value='train'>
                        <FormControlLabel value="train" control={<Radio />} label="Train" />
                        <FormControlLabel value="test" control={<Radio />} label="Test" />
                        <FormControlLabel value="unlabeled" control={<Radio />} label="Unlabeled" style={{marginRight: 0}}/>
                    </RadioGroup>
                </FormControl>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor:'transparent',
                        border: '1px dashed rgb(97, 117, 156)',
                        marginBottom: 32
                    }}
                    onDrop={fileDropHandler}
                    onDragOver={fileDragOverHandler}
                >
                    <CloudUpload style={{color: 'blue', fontSize: 48}}/>
                    <Typography>Drag or click to browse for file to add.</Typography>
                    <Typography>(Supported file types : TXT, TSV, JSON, XLSX)</Typography>
                </div>

                <Button
                    variant='outlined'
                    color='primary'
                >
                    Submit
                </Button>
            </div>
        </div>
    )
}

export default Dataset;