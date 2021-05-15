import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { connect, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';

import utilStyles from '../styles/utils.module.scss';

const Project= ({projectType, setProjectType}) => {

  return (
      <div
        style={{
          width: '100%', height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div>
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
                onClick={() => setProjectType('Pretraining')}
                style={{borderColor: projectType === 'Pretraining' ? '#4285f4' : '#eee'}}         
              >
                <img style={{margin: '0 20px'}}  src='/icons/ner.png' />
                <p style={{fontSize: 16}}>Pretraining</p>            
              </div>
              <div
                className={utilStyles.index__projecttype}
                onClick={() => setProjectType('Classification')}
                style={{borderColor: projectType === 'Classification' ? '#4285f4' : '#eee'}}   
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
                onClick={() => setProjectType('Named-entity Recognition')}
                style={{borderColor: projectType === 'Named-entity Recognition' ? '#4285f4' : '#eee'}}   
              >
                <img style={{margin: '0 20px'}}  src='/icons/sentiment_analysis.png' />
                <p style={{fontSize: 16}}>Named-entity Recognition</p>            
              </div>
              <div
                className={utilStyles.index__projecttype}
                onClick={() => setProjectType('Machine Reading Comprehension')}
                style={{borderColor: projectType === 'Machine Reading Comprehension' ? '#4285f4' : '#eee'}}
              >
                <img style={{margin: '0 20px'}}  src='/icons/review_conversion.png' />
                <p style={{fontSize: 16}}>Machine Reading Comprehension</p>            
              </div>
            </div>
        </div>
      </div>
  )
}

function mapStateToProps(state){
  return { user: state.user.value.profile }
}

export default connect(mapStateToProps)(Project)