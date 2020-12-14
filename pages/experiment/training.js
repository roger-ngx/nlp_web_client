import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, Slider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { map } from 'lodash';

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
  
const Training = ({datasetNames}) => {
    const [experimentName, setExperimentName] = useState('');
    const [inputModel, setInputModel] = useState('');
    const [selectedDataset, setSelectedDataset] = useState();
    const [showAdvanceOption, setShowAdvanceOption] = useState(false);
    const [ batchSize, setBatchSize ] = useState('8');
    const [ epochs, setEpochs ] = useState('8');
    const [ learningRate, setLearningRate ] = useState('20');
    const [ maxSeqLength, setMaxSeqLength ] = useState('20');
    const [ gpus, setGPUs ] = useState('1');


    const handleChangeGPUs = (event, newValue) => {
        setGPUs(newValue);
    };

    const startTraning = () => {
        const data = {
            name: experimentName,
            input_model: inputModel,
            dataset: selectedDataset,
            batch_size: batchSize,
            epochs: epochs,
            learning_rate: learningRate,
            max_seq_length: maxSeqLength,
            no_gpus: gpus
        };

        fetch('http://localhost:3001/api/experiment', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        });
    }

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
                    value={experimentName}
                    onChange={e => setExperimentName(e.target.value)}
                    style={{marginBottom: 16}}
                />

                <TextField
                    id="input-model"
                    select
                    label="Input Model"
                    value={inputModel}
                    onChange={e => setInputModel(e.target.value)}
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
                    value={selectedDataset}
                    onChange={e => setSelectedDataset(e.target.value)}
                    style={{marginBottom: 16}}
                >
                    {
                        map(datasetNames, name => (
                            <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        ))
                    }
                </TextField>


                {
                    showAdvanceOption &&
                    <>
                        <TextField
                            required
                            id="batch-size"
                            label="Batch size"
                            style={{marginBottom: 16}}
                            type='number'
                            value={batchSize}
                            onChange={e => setBatchSize(e.target.value)}
                        />

                        <TextField
                            required
                            id="epochs"
                            label="Epochs"
                            style={{marginBottom: 16}}
                            type='number'
                            value={epochs}
                            onChange={e => setEpochs(e.target.value)}
                        />

                        <TextField
                            required
                            id="learning-rate"
                            label="Learning rate"
                            style={{marginBottom: 16}}
                            type='number'
                            value={learningRate}
                            onChange={e => setLearningRate(e.target.value)}
                        />

                        <TextField
                            required
                            id="max-seq-length"
                            label="Max seq length"
                            style={{marginBottom: 16}}
                            type='number'
                            value={maxSeqLength}
                            onChange={e => setMaxSeqLength(e.target.value)}
                        />

                        <Typography id="discrete-slider-always" gutterBottom>
                            GPUs
                        </Typography>
                        <Slider
                            aria-labelledby="discrete-slider-always"
                            step={1}
                            marks={marks}
                            max={6}
                            min={1}
                            value={gpus}
                            onChange={handleChangeGPUs}
                        />
                    </>
                }

                <FormControlLabel
                    control={
                        <Switch
                            checked={showAdvanceOption}
                            color="primary"
                            onClick={e => setShowAdvanceOption(e.target.checked)}
                        />
                    }
                    label="Advanced"
                    style={{marginTop: 16}}
                />

                <Button
                    variant='outlined'
                    color='primary'
                    style={{marginTop: 16}}
                    onClick={startTraning}
                >
                    Train
                </Button>

            </div>
        </div>
    )
}

export default Training;