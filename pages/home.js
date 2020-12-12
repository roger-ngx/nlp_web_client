import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';

import utilStyles from '../styles/utils.module.scss';
import Layout from '../components/layout';

const Home= ({user}) => {

  const [ selectedType, setSelectedType ] = useState();
  console.log(user);
  return (
    <Layout>
      <Paper style={{width: '60%', margin: 'auto', padding: 20}}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <img style={{margin: 'auto'}} src='/icons/project_type.png' />
            <p style={{textAlign: 'center'}}>Select Project Type</p>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <div
              className={utilStyles.index__projecttype}
              onClick={() => setSelectedType('ner')}
              style={{borderColor: selectedType === 'ner' ? '#4285f4' : '#eee'}}         
            >
              <img style={{margin: '0 20px'}}  src='/icons/ner.png' />
              <p style={{fontSize: 16}}>Pretraining</p>            
            </div>
            <div
              className={utilStyles.index__projecttype}
              onClick={() => setSelectedType('tc')}
              style={{borderColor: selectedType === 'tc' ? '#4285f4' : '#eee'}}   
            >
              <img style={{margin: '0 20px'}} src='/icons/text_classification.png' />
              <p style={{fontSize: 16}}>Classification</p>            
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <div
              className={utilStyles.index__projecttype}
              onClick={() => setSelectedType('sa')}
              style={{borderColor: selectedType === 'sa' ? '#4285f4' : '#eee'}}   
            >
              <img style={{margin: '0 20px'}}  src='/icons/sentiment_analysis.png' />
              <p style={{fontSize: 16}}>Named-entity Recognition</p>            
            </div>
            <div
              className={utilStyles.index__projecttype}
              onClick={() => setSelectedType('rc')}
              style={{borderColor: selectedType === 'rc' ? '#4285f4' : '#eee'}}
            >
              <img style={{margin: '0 20px'}}  src='/icons/review_conversion.png' />
              <p style={{fontSize: 16}}>Machine Reading Comprehension</p>            
            </div>
          </div>
      </Paper>
    </Layout>
  )
}

function mapStateToProps(state){
  return { user: state.user.value._profile }
}

export default connect(mapStateToProps)(Home)