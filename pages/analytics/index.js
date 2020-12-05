import React from 'react';
import { Button, TextField, IconButton, Fab, Divider } from '@material-ui/core';
import { FolderOpen, SubdirectoryArrowRight, NavigateNext, Search, VerticalAlignBottom, FilterList, Refresh } from '@material-ui/icons';
import { DataGrid } from '@material-ui/data-grid';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
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

const Analytics = () => {

    return(
        <Layout>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: '24px 5%',
                    alignItems: 'center'
                }}
            >
                <div>Default Project</div>
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
                    padding: '24px 5%',
                    alignItems: 'center'
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
                >
                    Upload phrases
                </Button>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '24px 5%',
                    alignItems: 'center'
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

            <div style={{ height: 400, width: '100%', padding: '24px 5%'}}>
                <DataGrid rows={[]} columns={columns} pageSize={5} />
            </div>
        </Layout>
    )
}

export default Analytics;