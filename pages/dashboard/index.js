import React, { useState, useEffect } from 'react';
import { Button, TextField, IconButton, Fab, Divider, DialogTitle, DialogContent, DialogActions, DialogContentText, Dialog } from '@material-ui/core';
import { FolderOpen, SubdirectoryArrowRight, NavigateNext, Search, VerticalAlignBottom, FilterList, Refresh, CloudUpload } from '@material-ui/icons';
import { DataGrid } from '@material-ui/data-grid';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';

import { w3cwebsocket as W3CWebSocket } from "websocket";
const client = new W3CWebSocket('ws://127.0.0.1:8080');

import Layout from '../../components/layout';

const columns = [
    { field: 'No', headerName: 'No', sortable: false },
    { field: 'Status', headerName: 'Status', sortable: false },
    { field: 'Inference', headerName: 'Inference', sortable: false },
    {
      field: 'Confirmed',
      headerName: 'Confirmed',
      type: 'number',
      sortable: false,
    },
    {
      field: 'Phrase',
      headerName: 'Phrase',
      sortable: false,
    },
    { field: 'Created', headerName: 'Created' },
    { field: 'Training', headerName: 'Training', sortable: false },
    { field: 'Test', headerName: 'Test', sortable: false },
    { field: 'Delete', headerName: 'Delete', sortable: false },
  ];

const Dashboard = () => {

    const [ openUploadModal, setOpenUploadModal ] = useState(false);

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
                    />
                    <Button variant='contained' color='primary' style={{width: 28, height: 28, minWidth: 28, borderRadius: 14, padding: 0}}>
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
                    <DataGrid rows={[]} columns={columns} pageSize={5} />
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