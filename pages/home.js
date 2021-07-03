import React, { forwardRef, useState, useEffect } from 'react';
import { Paper, Card, CardContent, Grid, CardHeader, Hidden, Slide, Dialog, Button, IconButton, TextField } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { isEmpty, map } from 'lodash';

import { setUserProjects, setCurrentUserProject } from '../stores/userSlice';
import CreateProjectDialog from '../components/CreateProjectDialog';

const Home = () => {
    const classes = useStyles();
    const router = useRouter();
    const user = useSelector(state => state.user.value._profile);

    if(isEmpty(user)){
        router.push('/');
    }

    const dispatch = useDispatch();

    const [ addProjectDialogOpenning, setProjectDialogOpenning ] = useState(false);

    const [ projects, setProjects ] = useState([]);

<<<<<<< HEAD
    dispatch(fetchDatasetItems(user.id));
  }, [user]);
=======
    useEffect(() => {
        if(user){
            getProjects();
        }
    }, [user]);
>>>>>>> 417e05a56385d3eab9b979b7826829ae5a17e0bd

    const getProjects = async () => {
        const res = await fetch(`http://localhost:8051/api/project/${user.id}`, {
            method: 'GET',
            mode: 'cors',
        });

        const project = await res.json();
        setProjects(project.data);

        dispatch(setUserProjects(project.data));
    };

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

        {
            addProjectDialogOpenning &&
            <CreateProjectDialog
                open={addProjectDialogOpenning}
                onClose={() => setProjectDialogOpenning(false)}
            />
        }
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