import React, { forwardRef, useState } from 'react';
import { Slide, Dialog, Button, IconButton, TextField } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import Project from './Project';

const CreateProjectDialog = ({open, onClose}) => {
    const [ currentStep, setCurrentStep ] = useState(1);
    const [ projectName, setProjectName ] = useState();
    const [ projectType, setProjectType ] = useState();

    const AddProjectDialogTransition = forwardRef((props, ref) => {
        return <Slide direction='left' ref={ref} {...props} />
    });

    const addNewProject = async () => {
        const data = {
            name: projectName,
            type: projectType,
            ownerId: user.id 
        }

        const res = await fetch('http://localhost:8051/api/project', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        console.log(res);
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={AddProjectDialogTransition}
        >
            <div style={{display: 'flex', flexDirection: 'row', margin: '10% 20%', height: '100%'}}>
                <div>
                    <IconButton
                        style={{padding: 18}}
                        onClick={() => {
                            onClose();
                            setCurrentStep(1);
                        }}
                    >
                        <Close />
                    </IconButton>
                </div>
                <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                    {
                        currentStep === 1 &&
                        <div style={{marginBottom: 'auto'}}>
                            <p>Create a project</p>
                            <p>Let's start with a name for your project</p>
                            <TextField
                                value={projectName}
                                onChange={e=>setProjectName(e.target.value)}
                                placeholder='Enter your project name'
                                style={{width: '100%'}}
                            />
                        </div>
                    }
                    {
                        currentStep === 2 &&
                        <Project
                            projectType={projectType}
                            setProjectType={setProjectType}
                        />
                    }
                    <Button
                        style={{alignSelf: 'flex-start'}}
                        variant='contained'
                        color='primary'
                        onClick={async () => {
                            if(currentStep === 1){
                                setCurrentStep(currentStep + 1)
                            } else {
                                await addNewProject();

                                setCurrentStep(1);
                                onClose();
                            }
                        }}
                    >
                        {currentStep===1?'Continue':'Create'}
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}

export default CreateProjectDialog;
