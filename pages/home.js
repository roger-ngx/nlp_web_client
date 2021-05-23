import React, { forwardRef, useState, useEffect } from 'react';
import { Paper, Card, CardContent, Grid, CardHeader, Hidden, Slide, Dialog, Button, IconButton, TextField } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import Project from './project';
import { useRouter } from 'next/router';
import { isEmpty, map } from 'lodash';

import { setUserProjects, setCurrentUserProject } from '../stores/userSlice';

const AddProjectDialogTransition = forwardRef((props, ref) => {
    return <Slide direction='left' ref={ref} {...props} />
})

const Home = () => {
    const classes = useStyles();
    const router = useRouter();
    const user = useSelector(state => state.user.value._profile);

    if(isEmpty(user)){
        router.push('/');
    }

    const dispatch = useDispatch();
    
    const [ addProjectDialogOpenning, setProjectDialogOpenning ] = useState(false);
    const [ currentStep, setCurrentStep ] = useState(1);
    const [ projectName, setProjectName ] = useState();
    const [ projectType, setProjectType ] = useState();

    const [ projects, setProjects ] = useState([]);

    useEffect(() => {
        if(user){
            getProjects();
        }
    }, [user]);
    
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
    }

    const getProjects = async () => {
        const res = await fetch(`http://localhost:8051/api/project/${user.id}`, {
            method: 'GET',
            mode: 'cors',
        });
        
        const project = await res.json();
        setProjects(project.data);

        dispatch(setUserProjects(project.data));
    }

    return !user ? <div>Loading...</div>
    :
    <div
        style={{width: '100%', height: '100%', margin: 'auto'}}
    >
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '0 16px'
            }}
        >
            <p>UDP Admin</p>
            <div style={{width: 32, height: 32, borderRadius: 16, overflow: 'hidden'}}>
                <img src={user.profilePicURL} />
            </div>
        </div>
        <div style={{margin: '10% 20%'}}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Card className={classes.card}>
                        <CardContent
                            className={classes.cardContent}
                            onClick={() => setProjectDialogOpenning(true)}
                        >
                            <Add />
                            Add project
                        </CardContent>
                    </Card>
                </Grid>

                {
                    map(projects, project => (
                        <Grid item xs={12} sm={4} key={project._id}>
                            <Card
                                className={classes.card}
                                onClick={() => {
                                    dispatch(setCurrentUserProject(project));
                                    router.push(`/dashboard`)
                                }}
                            >
                                <CardHeader
                                    title={project.name}
                                    subheader={project.type}
                                />
                                <CardContent>
                                    Project detail
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </div>
        <Dialog
            fullScreen
            open={addProjectDialogOpenning}
            onClose={() => setProjectDialogOpenning(false)}
            TransitionComponent={AddProjectDialogTransition}
        >
            <div style={{display: 'flex', flexDirection: 'row', margin: '10% 20%', height: '100%'}}>
                <div>
                    <IconButton
                        style={{padding: 18}}
                        onClick={() => {
                            setProjectDialogOpenning(false);
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
                                // setProjectName();
                                // setProjectType();
                                setProjectDialogOpenning(false);
                            }
                        }}
                    >
                        {currentStep===1?'Continue':'Create'}
                    </Button>
                </div>
            </div>
        </Dialog>
    </div>
}

const useStyles = makeStyles({
    card: {
        height: 200,
        cursor: 'pointer',
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: '#f6f7f9'
        }
    },
    cardContentNew: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Home;