import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Training from './training';
import Evaluation from './evaluation';
import Prediction from './prediction';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

const Experiment = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <div>
        <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Training" />
                <Tab label="Evaluation" />
                <Tab label="Prediction" />
            </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <Training />
        </TabPanel>
        <TabPanel value={value} index={1}>
            <Evaluation />
        </TabPanel>
        <TabPanel value={value} index={2}>
            <Prediction />
        </TabPanel>
    </div>
}

export default Experiment;