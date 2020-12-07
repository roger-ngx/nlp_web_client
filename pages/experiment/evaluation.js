import React from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

function createData(metric, result) {
  return { metric, result };
}

const rows = [
  createData('F1-scrore', 0.90),
  createData('Precision', 0.90),
  createData('Recall', 0.90),
  createData('Accuracy', 0.90),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Evaluation = () => {
    const classes = useStyles();

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row'
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
                    id="experiment-name"
                    select
                    label="Experiment Name"
                    value='Experiment 1'
                    style={{marginBottom: 16}}
                >
                    <MenuItem key='exp-1' value='Experiment 1'>
                        Experiment 1 
                    </MenuItem>
                </TextField>

                <TextField
                    id="dataset"
                    select
                    label="Dataset"
                    value='Dataset name 1'
                    style={{marginBottom: 32}}
                >
                    <MenuItem key='data-1' value='Dataset name 1'>
                        Dataset name 1
                    </MenuItem>
                </TextField>

                <Button
                    variant='outlined'
                    color='primary'
                >
                    Evaluate
                </Button>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1
                }}
            >
                <div
                    style={{
                        flex: 1,
                        marginBottom: 32
                    }}
                >
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>Metric</StyledTableCell>
                                <StyledTableCell>Result</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.metric}
                                    </StyledTableCell>
                                    <StyledTableCell>{row.result}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <div
                    style={{
                        flex: 1
                    }}
                >
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>#</StyledTableCell>
                                <StyledTableCell>Input</StyledTableCell>
                                <StyledTableCell>Output</StyledTableCell>
                                <StyledTableCell>Predicted</StyledTableCell>
                                <StyledTableCell>Result</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}

export default Evaluation;