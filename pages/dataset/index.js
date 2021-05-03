import React, { useState, useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import { Button, Typography, CircularProgress } from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { throttle, map } from 'lodash';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import socketClient from '../../lib/ws';

import Layout from '../../components/layout';
import LinearProgressWithLabel from '../../components/LinearProgessWithLabel';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

const Dataset = ({user, dataSet}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [uploadingFile, setUploadingFile] = useState();
    const [ datasetType, setDatasetType ] = useState('train');
    const [ datasetName, setDatasetName ] = useState('');
    const [ uploading, setUploading ] = useState(false);
    const [ fileUploadedPercent, setFileUploadedPercent ] = useState(0);
    const [ dataset, setDataSet ] = useState(dataSet);


    useEffect(() => {
        connectToSocket();
    }, []);

    const connectToSocket = () => {
        socketClient.on('thanhnguyen', (message) => {
            console.log(message);
            if(message){
                setFileUploadedPercent(+message);
            }
        });
    };

    const convertFileSizeFromBytes = (bytes) => {
        let count = 0;
        while(bytes >= 1000){
            bytes = bytes / 1000;
            count++;
        }

        let unit = '';
        switch(count){
            case 0:
                unit ='bytes';
                break;
            case 1:
                unit = 'kbs';
                break;
            case 2:
                unit='Mbs';
                break;
            case 3:
                unit='Gbs';
                break;
            case 4:
                unit='Tbs';
                break;
        }

        return bytes.toFixed(2) + unit
    }

    const fileSelectedHandle = e => {
        const file = e.target.files[0];

        setUploadingFile(file);
    }

    const fileDropHandler = e => {
        console.log('file dropped');
        e.preventDefault();

        const file = e.dataTransfer.files[0];

        setUploadingFile(file);
        console.log(file);
    };

    const fileDragOverHandler = e => {
        console.log('file is in drop zone');
        e.preventDefault();
    };

    const fileUploadHandler = () => {
        setUploading(true);

        const data = new FormData();
        data.append('file', uploadingFile);
        data.append('user', JSON.stringify(user));
        data.append('datasetName', datasetName);
        data.append('datasetType', datasetType);

        fetch('http://localhost:3001/api/file/upload', {
            method: 'POST',
            body: data,
            mode: 'cors'
        }).then(data => {
            console.log(data);
            if(data.status === 200){
                setDataSet([{name: datasetName, type: datasetType, created_at: (new Date()).toISOString()}, ...dataset])
                setDatasetName('');
                setDatasetType('train');
                setUploadingFile(null);
            }
            setUploading(false);
        });
    };

    return(
        <Layout>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    margin: 24
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '20%',
                        marginRight: 32
                    }}
                >
                    <TextField
                        required
                        id="experiment-name"
                        label="Name"
                        value={datasetName}
                        onChange={e => setDatasetName(e.target.value)}
                        style={{marginBottom: 16}}
                    />

                    <FormControl component="fieldset" style={{marginBottom: 16}}>
                        <FormLabel component="legend">Type</FormLabel>
                        <RadioGroup row value={datasetType} onChange={e => setDatasetType(e.target.value)}>
                            <FormControlLabel value="train" control={<Radio />} label="Train" />
                            <FormControlLabel value="test" control={<Radio />} label="Test" />
                            <FormControlLabel value="unlabeled" control={<Radio />} label="Unlabeled" style={{marginRight: 0}}/>
                        </RadioGroup>
                    </FormControl>

                    <input
                        id='upload_file'
                        type='file'
                        multiple
                        style={{display: 'none'}}
                        onChange={fileSelectedHandle}
                    />
                    <label htmlFor='upload_file'>
                        <div
                            component='span'
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                backgroundColor:'transparent',
                                border: '1px dashed rgb(97, 117, 156)',
                                marginBottom: 32,
                                cursor: 'pointer'
                            }}
                            onDrop={fileDropHandler}
                            onDragOver={fileDragOverHandler}
                        >
                            {
                                !!uploadingFile ?
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%',
                                        minHeight: 200,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Typography>{uploadingFile.name}</Typography>
                                    <Typography>{convertFileSizeFromBytes(uploadingFile.size)}</Typography>
                                    {
                                        uploading && fileUploadedPercent &&
                                        <div style={{width: '90%'}}>
                                            <LinearProgressWithLabel value={fileUploadedPercent} />
                                        </div>
                                    }
                                </div>
                                :
                                <>
                                    <CloudUpload style={{color: 'blue', fontSize: 48}}/>
                                    <Typography>Drag or click to browse for file to add.</Typography>
                                    <Typography>(Supported file types : TXT, TSV, JSON, XLSX)</Typography>
                                </>
                            }
                        </div>
                    </label>

                    <Button
                        variant='outlined'
                        color='primary'
                        disabled={!uploadingFile || uploading}
                        onClick={throttle(fileUploadHandler, 2000, { trailing: false })}
                    >
                        {
                            uploading ?
                            <CircularProgress size={20} />
                            :
                            'Submit'
                        }
                    </Button>
                </div>
                <div
                    style={{flex: 1}}
                >
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Type</StyledTableCell>
                                <StyledTableCell>Last updated</StyledTableCell>
                                <StyledTableCell>Number of documents</StyledTableCell>
                                <StyledTableCell>Operation</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                map(dataset, (row) => 
                                (<StyledTableRow key={row._id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.type}</StyledTableCell>
                                    <StyledTableCell align="right">{row.created_at}</StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                </StyledTableRow>)
                                )
                            }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Layout>
    )
}

const mapStateRoProps = (state) => ({
    user: state.user.value._profile,
    dataSet: state.dataset.value
})

export default connect(mapStateRoProps)(Dataset);