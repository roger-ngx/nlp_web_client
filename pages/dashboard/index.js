import React, { useState, useEffect, useRef } from 'react';
import { 
    Button, TextField, IconButton, Divider,
    DialogTitle, DialogContent, DialogActions,
    DialogContentText, Dialog, Table, TableHead,
    TableRow, TableCell, TableBody,
    Switch, Popover, Typography, MenuItem, MenuList
} from '@material-ui/core';

import { FolderOpen, SubdirectoryArrowRight, NavigateNext, Search, VerticalAlignBottom, FilterList, Refresh, CloudUpload } from '@material-ui/icons';
import { DataGrid } from '@material-ui/data-grid';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import { map } from 'lodash';
import moment from 'moment';
import { Autocomplete } from '@material-ui/lab';

import DeleteIcon from '@material-ui/icons/Delete';

import { w3cwebsocket as W3CWebSocket } from "websocket";
const client = new W3CWebSocket('ws://127.0.0.1:8080');

import Layout from '../../components/layout';

const columns = [
    { field: 'id', headerName: 'No', sortable: false },
    { field: 'status', headerName: 'Status', sortable: false },
    { field: 'inference', headerName: 'Inference', sortable: false },
    {
      field: 'confirmed',
      headerName: 'Confirmed',
      type: 'number',
      sortable: false,
    },
    {
      field: 'phrase',
      headerName: 'Phrase',
      sortable: false,
      width: 500,
    },
    { field: 'created', headerName: 'Created', width: 150 },
    { field: 'training', headerName: 'Training', sortable: false },
    { field: 'test', headerName: 'Test', sortable: false },
    { field: 'delete', headerName: 'Delete', sortable: false },
];

const Phrase = ({data, onDataChanged}) => {

    const [ phraseData, setPhraseData ] = useState(data);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const textRef = useRef(null);

    useEffect(() => {
        onDataChanged(phraseData);
    }, [phraseData]);

    return (
        <TableRow>
            <TableCell>{phraseData.id}</TableCell>
            <TableCell>
                <div style={{backgroundColor: '#e0e0e0', padding: '8px 16px', borderRadius: 20}}>
                    {phraseData.status}
                </div>
            </TableCell>
            <TableCell>
                {phraseData.inference}
            </TableCell>
            <TableCell>
                <TextField ref={textRef} label='Select...' variant='outlined' onClick={e => setAnchorEl(e.currentTarget)}/>
                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={() => {
                        textRef.current.blur();
                        setAnchorEl(null);
                    }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <div>
                        <MenuList>
                            <MenuItem>Item 1</MenuItem>
                            <MenuItem>Item 2</MenuItem>
                        </MenuList>
                        <TextField />
                    </div>
                </Popover>
            </TableCell>
            <TableCell style={{width: '30%'}}>{phraseData.phrase}</TableCell>
            <TableCell>{moment(phraseData.created).format('YYYY.MM.DD HH:mm:ss').toString()}</TableCell>
            <TableCell>
                <Switch
                    checked={phraseData.training}
                    onChange={e => {
                        phraseData.training = e.target.checked;
                        setPhraseData({...phraseData});
                    }}
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </TableCell>
            <TableCell>
                <Switch
                    checked={phraseData.test}
                    onChange={e => {
                        phraseData.test = e.target.checked;
                        setPhraseData({...phraseData});
                    }}
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </TableCell>                                      
            <TableCell>
                <IconButton>
                    <DeleteIcon />
                </IconButton>
            </TableCell>                                      
        </TableRow>
    )
}

const Dashboard = () => {

    const [ openUploadModal, setOpenUploadModal ] = useState(false);

    const [ phrase, setPhrase ] = useState('');

    const [ phraseData, setPhraseData ] = useState([]);

    useEffect(() => {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        client.onmessage = (message) => {
            console.log(message);
        };
    }, []);

    const fileDropHandler = e => {
        console.log('file dropped');
        e.preventDefault();

        const file = e.dataTransfer.files[0];

        const data = new FormData();
        data.append('file', file);
        data.append('user', 'roger');

        fetch('http://183.96.253.147:8051/api/file/upload', {
            method: 'POST',
            body: data,
            mode: 'cors'
        }).then(data => console.log(data));
    };

    const fileDragOverHandler = e => {
        console.log('file is in drop zone');
        e.preventDefault();
    };

    const testConnection = () => {
        fetch('/api/users', {
            method: 'GET'
        }).then(res => console.log(res));
    };
    
    const onAddNewPhrase = () => {
        const data = { id: 'id', status: 'Inferring', inference: '', confirmed: '', phrase: phrase, created: new Date(), training: false, test: false, delete: false };
        setPhraseData([...phraseData, data]);
        setPhrase('');
    }

    return(
        <Layout>
            <div style={{padding: 24}}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 24
                    }}
                >
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <div style={{marginRight: 24}}>Last train success</div>
                        <Button variant='contained' color='primary' style={{marginRight: 24}}>Train Modal</Button>
                        <Button variant='contained' color='primary'>Enable Group</Button>
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 24
                    }}
                >
                    <SubdirectoryArrowRight />
                    <InputBase
                        style={{flex: 1}}
                        placeholder='Add a pharase and hit Enter'
                        value={phrase}
                        onChange={e => setPhrase(e.target.value)}
                        onKeyPress={e => e.key==='Enter'&&onAddNewPhrase()}
                    />
                    <Button
                        variant='contained'
                        color='primary'
                        style={{width: 28, height: 28, minWidth: 28, borderRadius: 14, padding: 0}}
                        onClick={onAddNewPhrase}
                    >
                        <NavigateNext />
                    </Button>
                    <Divider style={{margin: '0 12px'}} orientation='vertical' flexItem />
                    <Button
                        variant='text'
                        startIcon={<FolderOpen />}
                        onClick={() => setOpenUploadModal(true)}
                    >
                        Upload phrases
                    </Button>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 24
                    }}
                >
                    <TextField
                        placeholder='Search phrase'
                        InputProps={{
                            disableUnderline: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        variant='text'
                        startIcon={<FilterList />}
                        onClick={testConnection}
                    >
                        Filter
                    </Button>
                    <Button
                        variant='text'
                        startIcon={<Refresh />}
                    >
                        Refresh
                    </Button>
                    <Button
                        variant='text'
                        startIcon={<VerticalAlignBottom />}
                        style={{marginLeft: 'auto', textTransform: 'none'}}
                    >
                        Download
                    </Button>
                </div>

                <div style={{ height: 400, width: '100%'}}>
                    {/* <DataGrid rows={phraseData} columns={columns} pageSize={5} /> */}
                    <Table>
                        <TableHead>
                            <TableRow>
                                {
                                    map(columns, column => (
                                        <TableCell>{column.headerName}</TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                map(phraseData, (data, index) => (
                                    <Phrase data={data} onDataChanged={data => phraseData[index] = data}/>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>

            <Dialog onClose={() => setOpenUploadModal(false)} open={openUploadModal}>
                <DialogTitle>Upload phrases</DialogTitle>
                <DialogContent>
                    <DialogContentText>Each phrase should start on a new line in the document.</DialogContentText>
                    <DialogContentText>For example :</DialogContentText>
                    <DialogContentText>How many dependents can I have on my plan?</DialogContentText>
                    <DialogContentText>How do I get reimbursed for medical supplies?</DialogContentText>
                    <div
                        style={{padding: '0.5rem', backgroundColor:'rgb(192, 200, 216)'}}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                backgroundColor:'transparent',
                                border: '1px dashed rgb(97, 117, 156)'
                            }}
                            onDrop={fileDropHandler}
                            onDragOver={fileDragOverHandler}
                        >
                            <CloudUpload style={{color: 'blue', fontSize: 48}}/>
                            <DialogContentText>Drag or click to browse for file to add.</DialogContentText>
                            <DialogContentText>(Supported file types : TXT, TSV, JSON, XLSX)</DialogContentText>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='text'
                        onClick={() => setOpenUploadModal(false)}
                    >
                        Cancel
                    </Button>
                    <Button variant='contained' disabled>Upload</Button>
                </DialogActions>
            </Dialog>
        </Layout>
    )
}

export default Dashboard;