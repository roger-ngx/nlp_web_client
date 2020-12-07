import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, Slider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const marks = [
    {
        value: 1,
        label: '1',
    },
    {
        value: 2,
        label: '2',
    },
    {
        value: 3,
        label: '3',
    },
    {
        value: 4,
        label: '4',
    },
    {
        value: 5,
        label: '5',
    },
    {
        value: 6,
        label: '6',
    }
];
  
const Training = () => {
    const [gpus, setGPUs] = useState([1, 5]);

    const handleChange = (event, newValue) => {
        setGPUs(newValue);
    };

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    width: '20%'
                }}
            >
                <TextField
                    required
                    id="experiment-name"
                    label="Experiment Name"
                    defaultValue="Experiment 1"
                    style={{marginBottom: 16}}
                />

                <TextField
                    id="input-model"
                    select
                    label="Input Model"
                    value='FinBERT'
                    style={{marginBottom: 16}}
                >
                    <MenuItem key='FinBERT' value='FinBERT'>
                        FinBERT 
                    </MenuItem>
                </TextField>

                <TextField
                    id="dataset"
                    select
                    label="Dataset"
                    value='Dataset name 1'
                    style={{marginBottom: 16}}
                >
                    <MenuItem key='dataset-name-1' value='Dataset name 1'>
                        Dataset name 1 
                    </MenuItem>
                </TextField>

                <TextField
                    required
                    id="batch-size"
                    label="Batch size"
                    defaultValue="8"
                    style={{marginBottom: 16}}
                />

                <TextField
                    required
                    id="epochs"
                    label="Epochs"
                    defaultValue="20"
                    style={{marginBottom: 16}}
                />

                <TextField
                    required
                    id="learning-rate"
                    label="Learning rate"
                    defaultValue="20"
                    style={{marginBottom: 16}}
                />

                <TextField
                    required
                    id="max-seq-length"
                    label="Max seq length"
                    defaultValue="20"
                    style={{marginBottom: 16}}
                />

                <Typography id="discrete-slider-always" gutterBottom>
                    GPUs
                </Typography>
                <Slider
                    defaultValue={1}
                    // getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-always"
                    step={1}
                    marks={marks}
                    // valueLabelDisplay="on"
                    max={6}
                    min={1}
                />

                <FormControlLabel
                    control={
                        <Switch
                            checked={true}
                            color="primary"
                        />
                    }
                    label="Advanced"
                    style={{marginTop: 16}}
                />

                <Button
                    variant='outlined'
                    color='primary'
                    style={{marginTop: 16}}
                >
                    Train
                </Button>

            </div>
        </div>
    )
}

export default Training;