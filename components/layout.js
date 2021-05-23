import Link from 'next/link';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import { Twitter, NearMe, Settings, Restore, Assessment, Assignment } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { isEmpty, map } from 'lodash';

import styles from './layout.module.css';
import { Select, MenuItem, ListSubheader, Divider } from '@material-ui/core';

const drawerWidth = 60;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: {
    height: 100,
    marginTop: 20,
    textAlign: 'center'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: theme.palette.background.default,
    // padding: theme.spacing(3),
    marginLeft: drawerWidth,
    height: '100vh'
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();
  const router = useRouter();

  const user = useSelector(state => state.user.value._profile);
  if(isEmpty(user)){
    router.push('/');
  }

  const projects = useSelector(state => state.user.projects);
  const currentProject = useSelector(state => state.user.currentProject);

  const currentPath = router.pathname;
  console.log(currentPath);

  return (
    !user ?
    <div>Loading ...</div>
    :
    <div className={styles.container}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar}>
          <Link href='/home'>
            <div style={{margin: 'auto', width: 32, borderRadius: 32, overflow: 'hidden'}}>
              <img src='./images/phoenix.png' />
            </div>
          </Link>
        </div>
        <List>
          <Link href='/dashboard'>
            <ListItem button style={{height: 60}} selected={currentPath.includes('dashboard')}>
              <ListItemIcon><NearMe /></ListItemIcon>
            </ListItem>
          </Link>

          <Link href='/dataset'>
            <ListItem button style={{height: 60}}  selected={currentPath.includes('dataset')}>
              <ListItemIcon><Assignment /></ListItemIcon>
            </ListItem>
          </Link>

          <Link href='/experiment'>
            <ListItem button style={{height: 60}} selected={currentPath.includes('experiment')}>
              <ListItemIcon><Restore /></ListItemIcon>
            </ListItem>
          </Link>

          <Link href='/analytics'>
            <ListItem button style={{height: 60}} selected={currentPath.includes('analytics')}>
              <ListItemIcon><Assessment /></ListItemIcon>
            </ListItem>
          </Link>

          <Link href='/setting'>
            <ListItem button style={{height: 60}} selected={currentPath.includes('setting')}>
              <ListItemIcon><Settings /></ListItemIcon>
            </ListItem>
          </Link>
        </List>
      </Drawer>
      
      <main  className={classes.content}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 24,
            alignItems: 'center'
          }}
        >
          <Select
            value={currentProject.name}
          >
            <MenuItem>See all projects</MenuItem>
            <MenuItem>Add a project</MenuItem>
            <Divider />
            <ListSubheader>All projects</ListSubheader>
            {
              map(projects, project => (
                <MenuItem value={project.name}>{project.name}</MenuItem>
              ))
            }
          </Select>
          <div style={{width: 32, height: 32, borderRadius: 16, overflow: 'hidden'}}>
            <img src={user.profilePicURL} />
          </div>
        </div>
        <div style={{flex: 1}}>
          {children}
        </div>
      </main>
    </div>
  )
}