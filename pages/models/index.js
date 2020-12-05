import React from 'react';
import { Button, TextField, IconButton, Fab, Divider } from '@material-ui/core';
import { FolderOpen, SubdirectoryArrowRight, NavigateNext, Search, VerticalAlignBottom, FilterList, Refresh } from '@material-ui/icons';
import { DataGrid } from '@material-ui/data-grid';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import Layout from '../../components/layout';


const columns = [
    { field: 'Model Name', headerName: 'Model Name', sortable: false },
    { field: 'Metrics', headerName: 'Metrics', sortable: false },
    { field: 'Created At', headerName: 'Created At', sortable: false },
    {
      field: 'Actions',
      headerName: 'Confirmed',
      type: 'number',
      sortable: false,
    }
  ];

const Models = () => {

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
            </div>

            <div style={{ height: 400, width: '100%', padding: '24px 5%'}}>
                <div>Model History</div>
                <DataGrid rows={[]} columns={columns} pageSize={5} />
            </div>
        </Layout>
    )
}

export default Models;