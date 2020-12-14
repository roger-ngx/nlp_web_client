import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { connect, useDispatch } from 'react-redux';
import { map } from 'lodash';

import Training from './training';
import Evaluation from './evaluation';
import Prediction from './prediction';
import Layout from '../../components/layout';

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

const Experiment = ({dataset}) => {
    const datasetNames = map(dataset, item => item.name);

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
      <Layout>
          <AppBar position="static">
              <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                  <Tab label="Training" />
                  <Tab label="Evaluation" />
                  <Tab label="Prediction" />
              </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
              <Training datasetNames={datasetNames}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
              <Evaluation />
          </TabPanel>
          <TabPanel value={value} index={2}>
              <Prediction />
          </TabPanel>
      </Layout>
    )
}

const mapStateToProps = (state) => ({
  dataset: state.dataset.value
})

export default connect(mapStateToProps)(Experiment);